// /app/(website)/account/page.tsx
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect, notFound } from "next/navigation";
import React from "react";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";

import { getSession, getUserDetails, getSubscription, getProfile } from "@/app/(website)/supabase-server";
import { getGlobalFields, getSettings } from "@/lib/sanity/client";
import { urlForImage } from "@/lib/sanity/image";
import Navigation from "@/components/navigation";
import TabList from "./TabList";
import MyDetails from "./MyDetails";
import NewsletterPreferences from "./NewsletterPreferences";
import Commenting from "./Commenting";
import CurrentSubscription from "./CurrentSubscription";
import ManageSubscriptionButton from "./ManageSubscriptionButton";
import NotSubscriptionStatus from "./NotSubscriptionStatus";
import type { Database } from "@/types/supabase";
import styles from "@/styles/pages/account.module.scss";

export async function generateMetadata({ params }) {
  const settings = await getSettings();
  const title = "Account | Pirate Wires";
  const description = settings.meta_description;
  const image = urlForImage(settings?.openGraphImage)?.src ?? "";

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      images: [
        {
          url: image,
          width: 1200,
          height: 600,
        },
      ],
    },
  };
}
export default async function Account({ params }) {
  const session = await getSession();
  const userDetails = await getUserDetails(session?.user.id!);
  const subscription = await getSubscription();
  const profile = await getProfile(userDetails?.id!);
  const { tab } = params;

  const globalFields = await getGlobalFields();

  if (!session) {
    return redirect("/sign-in");
  }

  const updateCommentsDisplayName = async (formData: FormData) => {
    "use server";

    const newDisplayName = formData.get("commentsDisplayName") as string;
    const supabase = createServerActionClient<Database>({ cookies });
    const session = await getSession();
    const user = session?.user;

    if (user) {
      const { error } = await supabase
        .from("profiles")
        .update({ comments_display_name: newDisplayName })
        .eq("id", user.id);

      if (error) {
        throw error;
      }
    }

    revalidatePath("/account");
  };

  const updateCommentsNotifications = async (newCommentsNotifications: boolean) => {
    "use server";

    const supabase = createServerActionClient<Database>({ cookies });
    const user = session?.user;

    if (user) {
      const { error } = await supabase
        .from("profiles")
        .update({ comments_notifications: newCommentsNotifications })
        .eq("id", user.id);

      if (error) {
        console.error(error);
      }
    }

    revalidatePath("/account");
  };

  const TabSwitcher = ({ tab }: { tab: string }) => {
    switch (tab) {
      case "my-details":
        return <MyDetails userDetails={userDetails} />;
      case "newsletter-preferences":
        return <NewsletterPreferences user={userDetails} />;
      case "commenting":
        return (
          <Commenting
            updateCommentsDisplayName={updateCommentsDisplayName}
            updateCommentsNotifications={updateCommentsNotifications}
            profile={profile}
          />
        );
      case "subscription-billing":
        return userDetails?.subscription_id ? (
          <>
            <CurrentSubscription subscription={subscription} />
            <ManageSubscriptionButton session={session} />
          </>
        ) : (
          <NotSubscriptionStatus />
        );
      default:
        return notFound();
    }
  };

  return (
    <div
      className="colorWrapper reducedHeaderPage"
      style={
        {
          "--color": "#060606",
          "--bgColor": "#E3E3E3",
          "--accentLight": "rgba(43, 43, 43, 0.45)",
        } as React.CSSProperties
      }>
      <Navigation globalFields={globalFields} />

      <section className="accountContainer c-20">
        <div className={styles.top} data-name={userDetails?.full_name}>
          <h1>{userDetails?.full_name}</h1>
        </div>
        <div className={styles.bottom}>
          <div className={styles.left}>
            <TabList />
          </div>
          <div className={`${styles.right}`}>
            <div className={`${styles.cardWrapper}`}>
              <TabSwitcher tab={tab} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

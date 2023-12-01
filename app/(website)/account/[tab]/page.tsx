// /app/(website)/account/page.tsx
import {
  getSession,
  getUserDetails,
  getSubscription,
  getProfile,
} from "@/app/(website)/supabase-server";
import type {Database} from "@/types/supabase";
import {createServerActionClient} from "@supabase/auth-helpers-nextjs";
import {revalidatePath} from "next/cache";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import React from "react";
import Navigation from "@/components/navigation";
import {getGlobalFields, getSettings} from "@/lib/sanity/client";
import {urlForImage} from "@/lib/sanity/image";
import AccountUI from "./accountUI";

export async function generateMetadata({params}) {
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
export default async function Account({params}) {
  const [session, userDetails, subscription] = await Promise.all([
    getSession(),
    getUserDetails(),
    getSubscription(),
  ]);
  const profile = await getProfile(userDetails?.id!);
  const {tab} = params;

  const globalFields = await getGlobalFields();

  if (!session) {
    return redirect("/sign-in");
  }
  const updateName = async (formData: FormData) => {
    "use server";

    const newName = formData.get("name") as string;
    const supabase = createServerActionClient<Database>({cookies});
    const session = await getSession();
    const user = session?.user;

    if (user) {
      const {error} = await supabase
        .from("users")
        .update({full_name: newName})
        .eq("id", user.id);

      if (error) {
        throw error;
      }
    }

    revalidatePath("/account");
  };

  const updateCommentsDisplayName = async (formData: FormData) => {
    "use server";

    const newDisplayName = formData.get("commentsDisplayName") as string;
    const supabase = createServerActionClient<Database>({cookies});
    const session = await getSession();
    const user = session?.user;

    if (user) {
      const {error} = await supabase
        .from("profiles")
        .update({comments_display_name: newDisplayName})
        .eq("id", user.id);

      if (error) {
        throw error;
      }
    }

    revalidatePath("/account");
  };

  const updateCommentsNotifications = async (
    newCommentsNotifications: boolean,
  ) => {
    "use server";

    const supabase = createServerActionClient<Database>({cookies});
    const user = session?.user;

    if (user) {
      const {error} = await supabase
        .from("profiles")
        .update({comments_notifications: newCommentsNotifications})
        .eq("id", user.id);

      if (error) {
        console.error(error);
      }
    }

    revalidatePath("/account");
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
      <AccountUI
        tab={tab}
        userDetails={userDetails}
        subscription={subscription}
        session={session}
        profile={profile}
        updateName={updateName}
        updateCommentsNotifications={updateCommentsNotifications}
        updateCommentsDisplayName={updateCommentsDisplayName}
      />
    </div>
  );
}

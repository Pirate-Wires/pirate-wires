// /app/(website)/account/page.tsx
import {
  getSession,
  getUserDetails,
  getSubscription
} from '@/app/(website)/supabase-server';
import type { Database } from '@/types/supabase';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';
import Navigation from '@/components/navigation';
import { getAuthorsData, getGlobalFields, getSettings } from "@/lib/sanity/client";
import AccountUI from "@/app/(website)/account/accountUI";
import { urlForImage } from "@/lib/sanity/image";

export async function generateMetadata({ params }) {
  const settings = await getSettings();
  const title = "Account | Pirate Wires"
  const description = settings.meta_description
  const image = urlForImage(settings?.openGraphImage)?.src ?? ''

  return {
    title: title, description: description, openGraph: {
      title: title,
      description: description,
      images: [
        {
          url: image,
          width: 1200,
          height: 600,
        },
      ]
    }
  };
}
export default async function Account() {
  const [session, userDetails, subscription] = await Promise.all([
    getSession(),
    getUserDetails(),
    getSubscription()
  ]);

  const globalFields = await getGlobalFields();

  if (!session) {
    return redirect('/sign-in');
  }
  const updateName = async (formData: FormData) => {
    'use server';

    const newName = formData.get('name') as string;
    const supabase = createServerActionClient<Database>({ cookies });
    const session = await getSession();
    const user = session?.user;

    if (user) {
      const { error } = await supabase
        .from('users')
        .update({ full_name: newName })
        .eq('id', user.id);

      if (error) {
        throw error;
      }
    }

    revalidatePath('/account');
  };

  const updateEmail = async (formData: FormData) => {
    'use server';

    const newEmail = formData.get('email') as string;
    const supabase = createServerActionClient<Database>({ cookies });
    const { error } = await supabase.auth.updateUser({ email: newEmail });
    if (error) {
      throw error;
    }
    revalidatePath('/account');
  };


  const updateCommentsNotifications = async (newCommentsNotifications: boolean) => {
    'use server';

    const supabase = createServerActionClient<Database>({ cookies });
    const user = session?.user;

    if (user) {
      const { error } = await supabase
        .from('users')
        .update({ comments_notifications: newCommentsNotifications })
        .eq('id', user.id);

      if (error) {
        console.error(error);
      }
    }

    revalidatePath('/account');
  };

  return <div className="colorWrapper reducedHeaderPage" style={{
    "--color": "#060606",
    "--bgColor": "#E3E3E3",
    "--accentLight": "rgba(43, 43, 43, 0.45)",
  } as React.CSSProperties}>
    <Navigation globalFields={globalFields} />
    <AccountUI
      userDetails={userDetails}
      subscription={subscription}
      session={session}
      updateName={updateName}
      updateEmail={updateEmail}
      updateCommentsNotifications={updateCommentsNotifications}
    />
  </div>
}

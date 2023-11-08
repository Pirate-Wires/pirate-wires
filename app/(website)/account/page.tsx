import ManageSubscriptionButton from './ManageSubscriptionButton';
import Pricing from '@/components/Pricing';
import {
  getSession,
  getUserDetails,
  getSubscription,
  getActiveProductsWithPrices
} from '@/app/(website)/supabase-server';
import Button from '@/components/ui/Button';
import type { Database } from '@/types/supabase';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React, {ReactNode, useState} from 'react';
import Navbar from '@/components/ui/Navbar';
import Navigation from '@/components/navigation';
import AuthUI from "@/app/(website)/sign-in/AuthUI";
import {getGlobalFields} from "@/lib/sanity/client";
import styles from "@/styles/pages/account.module.scss"
import SignOutButton from "@/components/ui/Navbar/SignOutButton";
import AccountUI from "@/app/(website)/account/accountUI";

export default async function Account() {
  const [session, userDetails, products, subscription] = await Promise.all([
    getSession(),
    getUserDetails(),
    getActiveProductsWithPrices(),
    getSubscription()
  ]);

  const globalFields = await getGlobalFields();

  // console.log('session', session);
  // console.log('userDetails', userDetails);
  // console.log('products', products);
  // console.log('subscription', subscription);



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
        console.log(error);
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
      console.log(error);
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
      products={products}
      updateName={updateName}
      updateEmail={updateEmail}
    />
  </div>
}

interface Props {
  title: string;
  description?: string;
  footer?: ReactNode;
  children: ReactNode;
}

function Card({ title, description, footer, children }: Props) {
  return (
    <div className="w-full max-w-3xl m-auto my-8 border dark:border-gray-800 rounded-xs p">
      <div className="px-5 py-4">
        <h3 className="mb-1 text-xl">{title}</h3>
        <p className="text-sm">{description}</p>
        {children}
      </div>
      <div className="p-4 border-t dark:border-gray-800">
        {footer}
      </div>
    </div>
  );
}

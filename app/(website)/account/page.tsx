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
import { ReactNode } from 'react';
import Navbar from '@/components/ui/Navbar';
import Navigation from '@/components/navigation';

export default async function Account() {
  const [session, userDetails, products, subscription] = await Promise.all([
    getSession(),
    getUserDetails(),
    getActiveProductsWithPrices(),
    getSubscription()
  ]);

  const user = session?.user;
  console.log('user', user?.email);

  if (!session) {
    return redirect('/sign-in');
  }

  const subscriptionPrice =
    subscription &&
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: subscription?.prices?.currency!,
      minimumFractionDigits: 0
    }).format((subscription?.prices?.unit_amount || 0) / 100);

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

  return (
    <section className="mb-32">

      <Navbar />


      <Pricing
        session={session}
        user={session?.user}
        products={products}
        subscription={subscription}
      />

      <div className="p-4">
        <Card
          title="Your Plan"
          description={
            subscription
              ? `You are currently on the ${subscription?.prices?.products?.name} plan.`
              : 'You are not currently subscribed to any plan.'
          }
          footer={<ManageSubscriptionButton session={session} />}
        >
          <div className="mt-8 mb-4 text-xl font-semibold">
            {subscription ? (
              `${subscriptionPrice}/${subscription?.prices?.interval}`
            ) : (
              <Link href="/">Choose your plan</Link>
            )}
          </div>
        </Card>
        <Card
          title="Your Name"
          description="Please enter your full name, or a display name you are comfortable with."
          footer={
            <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
              <p className="pb-4 sm:pb-0">64 characters maximum</p>
              <Button
                variant="slim"
                type="submit"
                form="nameForm"
                disabled={true}
              >
                {/* WARNING - In Next.js 13.4.x server actions are in alpha and should not be used in production code! */}
                Update Name
              </Button>
            </div>
          }
        >
          <div className="mt-8 mb-4 text-xl font-semibold">
            <form id="nameForm" action={updateName}>
              <input
                type="text"
                name="name"
                className="w-full px-3 py-2 border rounded-xs outline-none focus:border-gray-300 focus:shadow-sm dark:bg-gray-900 dark:border-gray-600 dark:focus:border-white"
                defaultValue={userDetails?.full_name ?? ''}
                placeholder="Your name"
                maxLength={64}
              />
            </form>
          </div>
        </Card>

        <Card
          title="Your Email"
          description="Please enter the email address you want to use to login."
          footer={
            <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
              <p className="pb-4 sm:pb-0">
                We will email you to verify the change.
              </p>
              <Button
                variant="slim"
                type="submit"
                form="emailForm"
                disabled={true}
              >
                {/* WARNING - In Next.js 13.4.x server actions are in alpha and should not be used in production code! */}
                Update Email
              </Button>
            </div>
          }
        >
          <div className="mt-8 mb-4 text-xl font-semibold">

            <form id="emailForm" action={updateEmail}>
              <input
                type="text"
                name="email"
                className="w-full px-3 py-2 border rounded-xs outline-none focus:border-gray-300 focus:shadow-sm dark:bg-gray-900 dark:border-gray-600 dark:focus:border-white"
                defaultValue={user ? user.email : ''}
                placeholder="Your email"
                maxLength={64}
              />
            </form>
          </div>
        </Card>
      </div>
    </section>
  );
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

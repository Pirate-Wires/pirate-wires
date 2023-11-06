import {
  getSession,
  getUserDetails,
  getSubscription,
  getActiveProductsWithPrices
} from '@/app/(website)/supabase-server';
import type { Database } from '@/types/supabase';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import Navbar from '@/components/ui/Navbar';


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
    <div>

      <Navbar />

      <hr />

      {/* nav */}
      <ul>
        <li>My details</li>
        <li>Email Preferences</li>
        <li>Commenting</li>
        <li>Subscription & Billing</li>
        <li>Sign Out</li>
      </ul>

      <hr />

      <section>
        <h3>My Details</h3>
        <form>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            required
          />
          <br />
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            required
          />
          <br />
          <button type="submit">Save</button>
        </form>
        <form id="emailForm" action={updateEmail}>
          <label htmlFor="firstName">Update your email:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={user ? user.email : ''}
            required
          />
          <br />
          <button type="submit">Save</button>
        </form>
      </section>

      <hr />

      <section>
        <h3>Email Preferences</h3>
        <p>Subscribe or unsubscribe to our newsletters</p>
        <ul>
          <li>Pirate Wires</li>
          <li>The White Pill</li>
          <li>The Industry</li>
        </ul>
      </section>

      <hr />

      <section>
        <h3>Commenting</h3>
        <form id="emailForm" action={updateEmail}>
          <label htmlFor="firstName">Comment username:</label>
          <input
            type="text"
            id="commentUsername"
            name="commentUsername"
            required
          />
          <br />
          <p>Change this to add comments with another username</p>
          <button type="submit">Save</button>
        </form>
      </section>

      <hr />

      <section>
        <div>
          <h3>Subscription & Billing</h3>
          <p>
            {/* all subscriptionf from stipe must be aggregated into a single "product" */}
            {subscription
              ? `You are currently subscribed - ${subscription?.prices?.products?.name}.`
              : 'You are not currently subscribed to any plan.'}
          </p>
          <div className="">
            {subscription ? (
              `${subscriptionPrice}/${subscription?.prices?.interval}`
            ) : (
              <Link href="/">Subscribe</Link>
            )}
          </div>
        </div>
      </section>

      <hr />

      {/* <Pricing
        session={session}
        user={session?.user}
        products={products}
        subscription={subscription}
      /> */}


    </div>
  );
}





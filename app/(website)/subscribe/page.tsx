import { redirect } from "next/navigation";
import { getSession, getUserDetails } from "@/app/(website)/supabase-server";

export default async function PreviewPage() {
  const session = await getSession();
  const user = session?.user;
  const userDetails = await getUserDetails();
  const customerId = userDetails?.stripe_customer_id;

  if (!user) {
    redirect(`/subscribe/14-day-trial`);
  } else {
    redirect(`/subscribe/payment?email=${user?.email}&customerId=${customerId}`);
  }
}

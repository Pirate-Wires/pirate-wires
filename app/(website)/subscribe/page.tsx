import { redirect } from 'next/navigation';
import { getSession, getUserDetails, getUserCustomerId } from "@/app/(website)/supabase-server";

export default async function PreviewPage() {
  const session = await getSession();
  const user = session?.user;
  const userDetails = await getUserDetails();
  const customerId = await getUserCustomerId(userDetails);

  if (!user) {
    redirect(`/subscribe/step-1`);
  } else {
    redirect(`/subscribe/step-3?email=${user?.email}&customerId=${customerId}`)
  }
}

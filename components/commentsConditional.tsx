// server-components/commentsConditional.tsx
"use server";
import {getSession, getSubscription} from "@/app/(website)/supabase-server";

export async function commentsConditional() {
  const session = await getSession();
  const subscription = await getSubscription();

  // const authenticated = session?.user?.role === 'authenticated';

  console.log("session", session);
  console.log("subscription", subscription);
  // console.log('authenticated', authenticated);

  return {session, subscription};
}

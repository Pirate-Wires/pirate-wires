// server-components/commentsConditional.tsx
"use server";
import {getSession, getSubscription} from "@/app/(website)/supabase-server";

export async function commentsConditional() {
  const session = await getSession();
  const subscription = await getSubscription();

  return {session, subscription};
}

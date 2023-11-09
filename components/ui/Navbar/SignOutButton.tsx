'use client';

import { useSupabase } from '@/app/(website)/supabase-provider';
import { useRouter } from 'next/navigation';
import styles from "@/styles/pages/account.module.scss";

export default function SignOutButton() {
  const router = useRouter();
  const { supabase } = useSupabase();
  return (
    <button
      className={`${styles.cardTrigger}`}
      onClick={async () => {
        await supabase.auth.signOut();
        router.push('/sign-in');
      }}
    >
      Sign out
    </button>
  );
}

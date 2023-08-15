'use client';

import { useSupabase } from '@/app/(website)/supabase-provider';
import { getURL } from '@/utils/helpers';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

export default function AuthUI() {
  const { supabase } = useSupabase();
  return (
    <div className="flex flex-col space-y-4">
      <p className="text-xs">hook back up to supabase db-2. db-1 is dead</p>
      <Auth
        supabaseClient={supabase}
        providers={[]}
        redirectTo={`${getURL()}/auth/callback`}
        magicLink={true}
      />
    </div>
  );
}

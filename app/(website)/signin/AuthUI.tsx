'use client';

import { useSupabase } from '@/app/(website)/supabase-provider';
import { getURL } from '@/utils/helpers';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

export default function AuthUI() {
  const { supabase } = useSupabase();
  return (
    <div className="flex flex-col space-y-4">
      {/*
      <p className="text-xs">When making use of Magic Links with the PKCE Flow - links can only be used in the same browser that they are sent from. Consequently, a magic link sent from Chrome on Desktop will be invalid if used on a Mobile Device for example.</p> */}
      <Auth
        supabaseClient={supabase}
        providers={['github']}
        redirectTo={`${getURL()}/auth/callback`}
        magicLink={true}
        appearance={{ theme: ThemeSupa }}
      />
    </div>
  );
}

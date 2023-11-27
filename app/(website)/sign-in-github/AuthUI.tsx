"use client";
import styles from "@/styles/pages/signIn.module.scss";
import {useSupabase} from "@/app/(website)/supabase-provider";
import {getURL} from "@/utils/helpers";
import {Auth} from "@supabase/auth-ui-react";
import {ThemeSupa} from "@supabase/auth-ui-shared";
import Link from "next/link";

export default function AuthUI() {
  const {supabase} = useSupabase();
  return (
    <section className={`${styles.signInWrapper} flowContainer c-20 pb-20`}>
      <Auth
        supabaseClient={supabase}
        providers={["github"]}
        redirectTo={`${getURL()}/auth/callback`}
        magicLink={true}
        appearance={{theme: ThemeSupa}}
        onlyThirdPartyProviders={true} // Set onlyThirdPartyProviders to true
      />
    </section>
  );
}

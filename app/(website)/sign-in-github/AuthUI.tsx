'use client';
import styles from "@/styles/pages/signIn.module.scss"
import { useSupabase } from '@/app/(website)/supabase-provider';
import { getURL } from '@/utils/helpers';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import Link from "next/link";

export default function AuthUI() {
    const { supabase } = useSupabase();
    return (
        <section className={`${styles.signInWrapper} flowContainer c-20 pb-20`}>
            <h1>Sign In to Pirate Wires</h1>
            <Auth
                supabaseClient={supabase}
                providers={['github']}
                redirectTo={`${getURL()}/auth/callback`}
                magicLink={true}
                appearance={{ theme: ThemeSupa }}
            />
            <p className={styles.disclaimer}>By continuing, you agree to the <Link target={'_blank'} href={'https://app.termly.io/document/terms-of-service/7109fc1e-402d-466e-9f79-fe8cbe4a2b71'}>Terms & Conditions</Link> and <Link target={'_blank'} href={'https://app.termly.io/document/privacy-policy/42d3d1fe-f9d0-4cc4-9685-91ce1329b836'}>Privacy Policy</Link></p>
        </section>
    );
}

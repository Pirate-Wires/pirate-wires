// app/(website)/sign-in/AuthUI.tsx
'use client';
import styles from "@/styles/pages/signIn.module.scss"
import { useState } from 'react'
import { useSupabase } from '@/app/(website)/supabase-provider';
import Link from "next/link";

export default function AuthUI() {
    const [email, setEmail] = useState('')
    const [otp, setOtp] = useState('')

    const { supabase } = useSupabase()

    const handleEmailSubmit = async (e) => {
        e.preventDefault()

        const { data, error } = await supabase.auth.signInWithOtp({
            email,
            options: {
                emailRedirectTo: '/verify-otp'
            }
        })
    }

    const handleOTPSubmit = async (e) => {
        e.preventDefault()

        const { data, error } = await supabase.auth.signInWithOtp({
            email,
            otp,
            options: {
                emailRedirectTo: '/account'
            }
        })
    }



    return (
        <section className={`${styles.signInWrapper} flowContainer c-20 pb-20`}>
            <h1>Sign In to Pirate Wires</h1>

            <div>
                <h2>Sign in with OTP</h2>

                <div>
                    <h2>Request OTP</h2>

                    <form onSubmit={handleEmailSubmit}>
                        <input type="email" />
                        <button type="submit">Send OTP</button>
                    </form>

                    <h2>Verify OTP</h2>

                    <form onSubmit={handleOTPSubmit}>
                        <input type="text" />
                        <button type="submit">Verify</button>
                    </form>

                    <p>Check your email for the OTP!</p>
                </div>

            </div>

            <p className={styles.disclaimer}>By continuing, you agree to the <Link href={'/terms-conditions'}>Terms & Conditions</Link> and <Link href={'/privacy-policy'}>Privacy Policy</Link></p>
        </section>
    );
}

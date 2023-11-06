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

    const handleEmailChange = (e) => setEmail(e.target.value)

    const handleOtpChange = (e) => setOtp(e.target.value)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const { data, error } = await supabase.auth.signInWithOtp({
            email,
            otp,
            options: {
                emailRedirectTo: '/account'
            }
        })

        if (!error) {
            // Sign in successful
        }
    }

    return (
        <section className={`${styles.signInWrapper} flowContainer c-20 pb-20`}>
            <h1>Sign In to Pirate Wires</h1>

            <div>
                <h2>Sign in with OTP</h2>

                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={handleEmailChange}
                    />

                    <input
                        type="text"
                        placeholder="OTP"
                        value={otp}
                        onChange={handleOtpChange}
                    />

                    <button type="submit">Sign In</button>
                </form>
            </div>

            <p className={styles.disclaimer}>By continuing, you agree to the <Link href={'/terms-conditions'}>Terms & Conditions</Link> and <Link href={'/privacy-policy'}>Privacy Policy</Link></p>
        </section>
    );
}

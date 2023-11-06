// app/(website)/sign-in/AuthUI.tsx
'use client';
import React, { useState } from 'react';
import styles from "@/styles/pages/signIn.module.scss";
import { useSupabase } from '@/app/(website)/supabase-provider';
import Link from "next/link";

export default function AuthUI() {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [error, setError] = useState(null);
    const { supabase } = useSupabase();

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Clear previous errors

        const email = e.target.email.value; // get from input

        try {
            await supabase.auth.signInWithOtp({
                email,
                options: {
                    emailRedirectTo: '/verify-otp'
                }
            });
        } catch (error) {
            setError('Error sending OTP. Please try again.');
        }
    }

    const handleOTPSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Clear previous errors

        const otp = e.target.otp.value; // get from input

        try {
            await supabase.auth.signInWithOtp({
                email,
                otp,
                options: {
                    emailRedirectTo: '/account'
                }
            });
        } catch (error) {
            setError('Invalid OTP. Please check your email and try again.');
        }
    }

    return (
        <section className={`${styles.signInWrapper} flowContainer c-20 pb-20`}>
            <h1>Sign In to Pirate Wires</h1>
            <div>
                <h2>Sign in with OTP</h2>
                <div>
                    <h2>Request OTP</h2>
                    <form onSubmit={(e) => handleEmailSubmit(e)}>
                        <label htmlFor="email">Email:</label>
                        <input type="email" name="email" id="email" required />
                        <button type="submit">Send OTP</button>
                    </form>
                    <h2>Verify OTP</h2>
                    <form onSubmit={(e) => handleOTPSubmit(e)}>
                        <label htmlFor="otp">OTP:</label>
                        <input type="text" name="otp" id="otp" required />
                        <button type="submit">Verify</button>
                    </form>
                    {error && <p className={styles.error}>{error}</p>}
                    <p>Check your email for the OTP!</p>
                </div>
            </div>
            <p className={styles.disclaimer}>
                By continuing, you agree to the <Link href={'/terms-conditions'}>Terms & Conditions</Link> and{' '}
                <Link href={'/privacy-policy'}>Privacy Policy</Link>
            </p>
        </section>
    );
}

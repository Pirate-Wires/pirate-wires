// app/(website)/sign-in/AuthUI.tsx
'use client';
import React, { useState } from 'react';
import styles from "@/styles/pages/signIn.module.scss";
import { useSupabase } from '@/app/(website)/supabase-provider';
import Link from "next/link";
import OTPInput from './OTPInput';

export default function AuthUI() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const { supabase } = useSupabase();

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const email = e.target.email.value;

        try {
            await supabase.auth.signInWithOtp({
                email,
            });
        } catch (error) {
            setError('Error sending OTP. Please try again.');
        }

        setEmail(email);
    }

    const handleOTPSubmit = async (otp: string) => {
        setError(null);

        try {
            await supabase.auth.verifyOtp({
                email,
                token: otp,
                type: 'email',
                options: {
                    redirectTo: '/account'
                }
            });
        } catch (error) {
            setError('Invalid OTP. Please check your email and try again.');
        }
    };


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
                    <OTPInput onOTPSubmit={handleOTPSubmit} /> {/* Pass the onOTPSubmit function */}
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

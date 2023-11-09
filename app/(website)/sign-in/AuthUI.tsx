// /app/(website)/sign-in/AuthUI.tsx
'use client';
import React, { useState } from 'react';
import styles from "@/styles/pages/signIn.module.scss";
import { useSupabase } from '@/app/(website)/supabase-provider';
import Link from "next/link";
import OTPInput from './OTPInput';
import EmailInput from './EmailInput';

export default function AuthUI() {
    const [email, setEmail] = useState('');
    const [otpVisible, setOtpVisible] = useState(false); // State to control OTP input visibility
    const [error, setError] = useState<string | null>(null);
    const { supabase } = useSupabase();

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const email = e.target.email.value;

        try {
            await supabase.auth.signInWithOtp({
                email,
            });
            setEmail(email);
            setOtpVisible(true); // Show the OTP input when email is successfully submitted
        } catch (error) {
            setError('Error sending OTP. Please try again.');
        }
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
                {otpVisible ? ( // Show OTPInput component when otpVisible is true
                    <OTPInput onOTPSubmit={handleOTPSubmit} />
                ) : (
                    <EmailInput onSubmit={handleEmailSubmit} />
                )}
                {error && <p className={styles.error}>{error}</p>}
            </div>
            <p className={styles.disclaimer}>
                By continuing, you agree to the <Link href={'/terms-conditions'}>Terms & Conditions</Link> and{' '}
                <Link href={'/privacy-policy'}>Privacy Policy</Link>
            </p>
        </section>
    );
}

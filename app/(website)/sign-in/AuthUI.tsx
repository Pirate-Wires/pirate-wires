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
    const [isLoading, setIsLoading] = useState(false);
    const [otp, setOtp] = useState('');
    const [otpVisible, setOtpVisible] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);
    const { supabase } = useSupabase();

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        const email = e.target.email.value;

        try {
            const { error } = await supabase.auth.signInWithOtp({
                email,
            });

            if(error) {
                throw(error);
            }

            setEmail(email);
            setOtpVisible(true);
            setIsLoading(false);
        } catch (error) {
            setError(error.message);
            setIsLoading(false);
        }
    }

    const handleOTPSubmit = async (event) => {
        event.preventDefault();
        setError(null);
        setIsLoading(true);
        setSuccessMsg(null);

        try {
            const { error } = await supabase.auth.verifyOtp({
                email,
                token: otp,
                type: 'email',
                options: {
                    redirectTo: '/account'
                }
            });

            if(error) {
                throw(error);
            }

            setIsLoading(false);
        } catch (error) {
            setError(error.message);
            setIsLoading(false);
        }
    };

    const handleResendOTP = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);
        setSuccessMsg(null);

        try {
            const { error } = await supabase.auth.signInWithOtp({
                email
            });

            if(error) {
                throw(error);
            }

            setOtpVisible(true);
            setIsLoading(false);
            setSuccessMsg('Resent OTP successfully');
        } catch (error) {
            setError(error.message);
            setIsLoading(false);
        }
    }

    const handleOTPChange = (value: string) => {
        setOtp(value);
    }

    return (
        <section className={`${styles.signInWrapper} flowContainer c-20 pb-20`}>
            <h1>Sign In to Pirate Wires</h1>
            <div>
                {otpVisible ? ( // Show OTPInput component when otpVisible is true
                    <>
                        <h2>Confirm Your Sign In</h2>
                        <p>We just sent a 6 digit code to your email</p>
                        <form onSubmit={handleOTPSubmit}>
                            <OTPInput onOTPChange={handleOTPChange} />
                            <button type="submit" disabled={isLoading}>{isLoading ? 'Loading...' : 'Confirm'}</button>
                            <a href="#" onClick={handleResendOTP}>Resend Code</a>
                        </form>
                    </>
                ) : (
                    <EmailInput onSubmit={handleEmailSubmit} isLoading={isLoading} />
                )}
                {error && <p className={styles.error}>{error}</p>}
                {successMsg && <p className={styles.success}>{successMsg}</p>}
            </div>
            <p className={styles.disclaimer}>
                By continuing, you agree to the <Link target={'_blank'} href={'https://app.termly.io/document/terms-of-service/7109fc1e-402d-466e-9f79-fe8cbe4a2b71'}>Terms & Conditions</Link> and{' '}
                <Link target={'_blank'} href={'https://app.termly.io/document/privacy-policy/42d3d1fe-f9d0-4cc4-9685-91ce1329b836'}>Privacy Policy</Link>
            </p>
        </section>
    );
}

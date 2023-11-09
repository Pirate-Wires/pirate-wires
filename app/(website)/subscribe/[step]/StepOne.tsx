"use client"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { FormEvent } from 'react';
import styles from "@/styles/pages/subscribe.module.scss"

export default function StepOne() {
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const fnameInput = form.elements.namedItem('fname') as HTMLInputElement;
    const fname = fnameInput.value;
    const lnameInput = form.elements.namedItem('lname') as HTMLInputElement;
    const lname = lnameInput.value;
    const emailInput = form.elements.namedItem('email') as HTMLInputElement;
    const email = emailInput.value;

    if(!fname || !lname || !email)  return;

    router.push('/subscribe/step-2');
  }

  return (
    <section className={`${styles.subscribeWrapper} flowContainer c-20 pb-20`}>
      <h1>Step1</h1>
      <p>After your free 14 day trial ends, we will charge $12 from your account every month. Subscription can be cancelled anytime within your trial period.</p>
      <form onSubmit={handleSubmit}>
        <input type="text" name="fname" placeholder="First name" required />
        <input type="text" name="lname" placeholder="Last name" required />
        <input type="email" name="email" placeholder="Email" required />
        <button type="submit">Continue</button>
      </form>
      <p>Already have an account?<Link className="nav-link" href="/sign-in">Sign In</Link></p>
    </section>
  );
}

import {notFound} from "next/navigation";

import {getUserDetails} from "@/app/(website)/supabase-server";
import {getGlobalFields} from "@/lib/sanity/client";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import styles from "@/styles/pages/subscribe.module.scss";
import Link from "next/link";
import React from "react";

export default async function SubscribePage({params, searchParams}) {
  const user = await getUserDetails();
  const globalFields = await getGlobalFields();
  const {email, customerId} = searchParams;

  const StepSwitcher = ({step}: {step: string}) => {
    switch (step) {
      case "step-1":
        return <StepOne email={user?.email} />;
      case "step-2":
        return <StepTwo email={email} customerId={customerId} />;
      case "step-3":
        return (
          <StepThree
            email={email}
            customerId={customerId}
            subscription={user?.subscription_id!}
          />
        );
      case "step-4":
        return <StepFour email={email} />;
      default:
        return notFound();
    }
  };

  return (
    <div
      className="colorWrapper reducedHeaderPage"
      style={
        {
          "--color": "#060606",
          "--bgColor": "#E3E3E3",
          "--accentLight": "rgba(43, 43, 43, 0.45)",
        } as React.CSSProperties
      }>
      <Navigation globalFields={globalFields} />
      <section className={`${styles.subscribeWrapper} flowContainer c-20 pb-20`}>
        <StepSwitcher step={params.step} />
        <p className={`disclaimer`}>
          By continuing, you agree to the{" "}
          <Link
            target={"_blank"}
            href={
              "https://app.termly.io/document/terms-of-service/7109fc1e-402d-466e-9f79-fe8cbe4a2b71"
            }>
            Terms & Conditions
          </Link>{" "}
          and{" "}
          <Link
            target={"_blank"}
            href={
              "https://app.termly.io/document/privacy-policy/42d3d1fe-f9d0-4cc4-9685-91ce1329b836"
            }>
            Privacy Policy
          </Link>
        </p>
      </section>
    </div>
  );
}

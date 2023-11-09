"use client"
import styles from "@/styles/pages/subscribe.module.scss"

export default function StepFour() {
  return (
    <section className={`${styles.subscribeWrapper} flowContainer c-20 pb-20`}>
      <h1>Step4</h1>
      <p>After your free 14 day trial ends, we will charge $12 from your account every month. Subscription can be cancelled anytime within your trial period.</p>
    </section>
  );
}

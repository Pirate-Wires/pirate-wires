"use client";
import {useState} from "react";
import {usePathname, redirect} from "next/navigation";
import {useSupabase} from "@/app/(website)/supabase-provider";

import styles from "./_styles/newsletterCallout.module.scss";

export default function NewsletterCallout({newsletterData, globalFields}) {
  const currentRoute = usePathname();
  const {user} = useSupabase();
  const interiorPage = currentRoute === "/newsletters";
  const [selectedNewsLetters, setSelectedNewsLetters] = useState<String[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // we can't redirect from here, so we need to do it from the parent component
  // if (user) {
  //     redirect('/account/');
  // }

  const handleSubmit = async event => {
    event.preventDefault();

    const email = event.target.email.value;

    if (!email) {
      setIsSuccess(false);
      setError("Email is required");
      return;
    }
    if (!selectedNewsLetters.length) {
      setIsSuccess(false);
      setError("Newsletter selection is required");
      return;
    }

    setIsLoading(true);
    setIsSuccess(false);

    try {
      // Check if the email already exists in Customer.io
      const checkResponse = await fetch(
        `/api/customer-io/preferences?email=${email}`,
      );
      const checkData = await checkResponse.json();

      if (!checkResponse.ok) {
        throw new Error(
          `Error checking email existence! Status: ${checkResponse.status}`,
        );
      }

      if (checkData.exists) {
        // Email exists, retrieve existing preferences and update selectedNewsLetters
        const existingPreferences = checkData.preferences || [];
        setSelectedNewsLetters(existingPreferences);
      }

      // Proceed with updating or creating the user in Customer.io
      const updateResponse = await fetch("/api/customer-io/preferences", {
        method: "PUT",
        body: JSON.stringify({
          email,
          subscription: selectedNewsLetters,
        }),
      });

      if (!updateResponse.ok) {
        throw new Error(`HTTP error! Status: ${updateResponse.status}`);
      }

      const updateData = await updateResponse.json();

      if (updateData.success) {
        setIsSuccess(true);

        event.target.email.value = "";
        setSelectedNewsLetters([]);
      }

      setIsLoading(false);
      setError(null);
    } catch (error) {
      console.error("There was an error!", error);
      setIsLoading(false);
      setError(error.message);
    }
  };

  const handleSelect = event => {
    const name = event.target.name;
    setSelectedNewsLetters(
      selectedNewsLetters.indexOf(name) > -1
        ? selectedNewsLetters.filter(item => item !== name)
        : [...selectedNewsLetters, name],
    );
  };

  const clickInnerInput = event => {
    if (!event.target.classList.contains("newsletter-tile")) {
      event.target.closest(".newsletter-tile").querySelector("input").click();
    } else {
      event.target.querySelector("input").click();
    }
  };

  return (
    <>
      {/* <h1>Redirecting to your account page...</h1> */}

      <div
        className={`${styles.newsletterCallout} ${
          interiorPage ? styles.interiorPage : ""
        } ptb-40`}>
        <form
          className={`${styles.inner} c-20`}
          id="newsletter-form"
          method="POST"
          action=""
          onSubmit={handleSubmit}>
          <div className={styles.top}>
            {!interiorPage && <h4>Sign up for our Newsletters</h4>}
            <div className={`${styles.inputWrapper} inputWrapper`}>
              <input
                id="email_input"
                name="email"
                type="email"
                placeholder="Your email here..."
              />
              <button
                type="submit"
                name="Submit newsletter signup"
                id="submit"
                disabled={isLoading}>
                {isLoading ? "Loading..." : "Sign Up"}
              </button>
            </div>
            {isSuccess && (
              <p className={styles.successMessage}>Thanks for subscribing!</p>
            )}
            {!!error && <p className={styles.errorMessage}>{error}</p>}
            <p className={styles.selectedCount}>
              (<span>{selectedNewsLetters.length}</span>) Newsletters Selected
            </p>
          </div>

          <div className={styles.bottom}>
            <div
              className={`${styles.tile} ${styles.pirateWires} newsletter-tile mb-40`}
              onClick={clickInnerInput}>
              <p className={styles.eyebrow}>
                {globalFields.pirateWiresFrequency}
              </p>
              <p className={styles.title}>Pirate Wires</p>
              <p className={`${styles.subtitle} martina-reg`}>
                {globalFields.pirateWiresTagline}
              </p>
              <p className={styles.description}>
                {globalFields.pirateWiresDescription}
              </p>
              <div className={styles.tileBottom}>
                <div className={styles.checkboxWrapper}>
                  <label htmlFor="selected1">Selected</label>
                  <input
                    type="checkbox"
                    className="checkbox"
                    id="selected1"
                    name="Wires"
                    onChange={handleSelect}
                    checked={selectedNewsLetters.indexOf("Wires") > -1}
                  />
                </div>
              </div>
            </div>
            <div
              className={`${styles.tile} ${styles.whitePill} newsletter-tile mb-40`}
              onClick={clickInnerInput}>
              <p className={styles.eyebrow}>
                {globalFields.whitePillFrequency}
              </p>
              <p className={styles.title}>The White Pill</p>
              <p className={`${styles.subtitle} martina-reg`}>
                {globalFields.whitePillTagline}
              </p>
              <p className={styles.description}>
                {globalFields.whitePillDescription}
              </p>
              <div className={styles.tileBottom}>
                <div className={styles.checkboxWrapper}>
                  <label htmlFor="selected2">Selected</label>
                  <input
                    type="checkbox"
                    className="checkbox"
                    id="selected2"
                    name="The White Pill"
                    onChange={handleSelect}
                    checked={selectedNewsLetters.indexOf("The White Pill") > -1}
                  />
                </div>
              </div>
            </div>
            <div
              className={`${styles.tile} ${styles.industry} newsletter-tile mb-40`}
              onClick={clickInnerInput}>
              <p className={styles.eyebrow}>{globalFields.industryFrequency}</p>
              <p className={styles.title}>The Industry</p>
              <p className={`${styles.subtitle} martina-reg`}>
                {globalFields.industryTagline}
              </p>
              <p className={styles.description}>
                {globalFields.industryDescription}
              </p>
              <div className={styles.tileBottom}>
                <div className={styles.checkboxWrapper}>
                  <label htmlFor="selected3">Selected</label>
                  <input
                    type="checkbox"
                    className="checkbox"
                    id="selected3"
                    name="The Industry"
                    onChange={handleSelect}
                    checked={selectedNewsLetters.indexOf("The Industry") > -1}
                  />
                </div>
              </div>
            </div>
            <div
              className={`${styles.tile} ${styles.doloresPark} newsletter-tile mb-40`}
              onClick={clickInnerInput}>
              <p className={styles.eyebrow}>
                {globalFields.doloresParkFrequency}
              </p>
              <p className={styles.title}>Dolores Park</p>
              <p className={`${styles.subtitle} martina-reg`}>
                {globalFields.doloresParkTagline}
              </p>
              <p className={styles.description}>
                {globalFields.doloresParkDescription}
              </p>
              <div className={styles.tileBottom}>
                <div className={styles.checkboxWrapper}>
                  <label htmlFor="selected4">Selected</label>
                  <input
                    type="checkbox"
                    className="checkbox"
                    id="selected4"
                    name="Dolores Park"
                    onChange={handleSelect}
                    checked={selectedNewsLetters.indexOf("Dolores Park") > -1}
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

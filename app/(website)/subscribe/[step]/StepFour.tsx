"use client";
import Link from "next/link";
import {useRouter} from "next/navigation";

import React, {useState, FormEvent} from "react";

import {useSupabase} from "@/app/(website)/supabase-provider";
import styles from "@/styles/pages/subscribe.module.scss";

interface StepFourProps {
  email: string;
}

const StepFour: React.FC<StepFourProps> = ({email}) => {
  const router = useRouter();
  const {supabase} = useSupabase();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedNewsLetters, setSelectedNewsLetters] = useState<String[]>([]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/customer-io/preferences", {
        method: "PUT",
        body: JSON.stringify({
          email,
          subscription: selectedNewsLetters,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const password =
        process.env.SUPABASE_AUTH_USER_DEFAULT_PASSWORD || "12345678";
      const {error: signInError} = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        console.error("Error signing in:", signInError);
        return {error: signInError};
      }

      setSelectedNewsLetters([]);
      setIsLoading(false);
      setError(null);
      router.push("/account");
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

  return (
    <section className={`${styles.subscribeWrapper} flowContainer c-20 pb-20`}>
      <h1>Thank You for Subscribing!</h1>
      <p>
        $
        {`Want more of us? Sign Up to our newsletters that come out once a week.
        You'll like it.`}
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type="checkbox"
          name="Wires"
          onChange={handleSelect}
          checked={selectedNewsLetters.indexOf("Wires") > -1}
        />
        <label>Priate Wires</label>

        <input
          type="checkbox"
          name="The White Pill"
          onChange={handleSelect}
          checked={selectedNewsLetters.indexOf("The White Pill") > -1}
        />
        <label>The White Pill</label>

        <input
          type="checkbox"
          name="The Industry"
          onChange={handleSelect}
          checked={selectedNewsLetters.indexOf("The Industry") > -1}
        />
        <label>The Industry</label>

        <input
          type="checkbox"
          name="Dolores Park"
          onChange={handleSelect}
          checked={selectedNewsLetters.indexOf("Dolores Park") > -1}
        />
        <label>Dolores Park</label>

        <br />

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Sign up and start reading"}
        </button>

        <br />

        <Link className="nav-link" href="/home">
          No thanks, I just wanna start reading
        </Link>
      </form>
      {error && <p className={styles.error}>{error}</p>}
    </section>
  );
};

export default StepFour;

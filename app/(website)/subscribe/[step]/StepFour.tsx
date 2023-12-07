"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

import React, {useEffect, useState, FormEvent} from "react";

import styles from "@/styles/pages/subscribe.module.scss";
import {Toast, ToastUtil} from "@/components/ui/Toast";

interface StepFourProps {
  email: string;
}

const StepFour: React.FC<StepFourProps> = ({ email }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedNewsLetters, setSelectedNewsLetters] = useState<String[]>([]);

  useEffect(() => {
    if (isLoading) {
      ToastUtil.showLoadingToast();
    } else {
      ToastUtil.dismissToast();
    }
  }, [isLoading]);

  useEffect(() => {
    if (error) {
      ToastUtil.showErrorToast(error);
    }
  }, [error]);

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
    <>
      <h1>Thank You for Subscribing!</h1>
      <p>
        {`Want more of us? Sign Up to our newsletters that come out once a week.
        You'll like it.`}
      </p>
      <form onSubmit={handleSubmit}>
        <label className={`checkboxRow`}>
          <input
            type="checkbox"
            name="Wires"
            onChange={handleSelect}
            checked={selectedNewsLetters.indexOf("Wires") > -1}
          />
          Pirate Wires
        </label>

        <label className={`checkboxRow`}>
          <input
            type="checkbox"
            name="The White Pill"
            onChange={handleSelect}
            checked={selectedNewsLetters.indexOf("The White Pill") > -1}
          />
          The White Pill
        </label>

        <label className={`checkboxRow`}>
          <input
            type="checkbox"
            name="The Industry"
            onChange={handleSelect}
            checked={selectedNewsLetters.indexOf("The Industry") > -1}
          />
          The Industry
        </label>

        <label className={`checkboxRow`}>
          <input
            type="checkbox"
            name="Dolores Park"
            onChange={handleSelect}
            checked={selectedNewsLetters.indexOf("Dolores Park") > -1}
          />
          Dolores Park
        </label>

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Sign up and start reading"}
        </button>

        <Link className="nav-link" href="/home">
          No thanks, I just wanna start reading
        </Link>
      </form>
      {error && <p className={styles.error}>{error}</p>}
      <Toast />
    </>
  );
};

export default StepFour;

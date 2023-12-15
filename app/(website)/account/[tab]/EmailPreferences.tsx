"use client";

import {useState, useEffect} from "react";
import {Toast, ToastUtil, ToastableError} from "@/components/ui/Toast";

const EmailPreferences = ({user}) => {
  const [selectedNewsLetters, setSelectedNewsLetters] = useState<String[]>([]);
  const [isProgress, setIsProgress] = useState(false);
  const [isLoading, setIsLoading] = useState(0);
  const [error, setError] = useState<ToastableError | null>(null);
  const [successMsg, setSuccessMsg] = useState("");

  // Fetch and update user preferences on component mount
  useEffect(() => {
    setIsLoading(prev => prev + 1);
    // Make a GET request to fetch the user's preferences from the new API endpoint
    fetch(`/api/customer-io/preferences?email=${user.email}`)
      .then(async response => {
        if (!response.ok) {
          const data = await response.json();
          throw new ToastableError(data.message, response.status);
        }
        return response.json();
      })
      .then(data => {
        const userPreferences = data.preferences;
        setSelectedNewsLetters(userPreferences);
        setIsLoading(prev => prev - 1);
      })
      .catch(error => {
        console.error("Error fetching user preferences:", error);
        setIsLoading(prev => prev - 1);
      });
  }, [user.email]);

  useEffect(() => {
    if (error) {
      ToastUtil.showErrorToast(error);
    }
  }, [error]);

  useEffect(() => {
    if (isProgress) {
      ToastUtil.showLoadingToast();
    } else {
      ToastUtil.dismissToast();
    }
  }, [isProgress]);

  useEffect(() => {
    if (isLoading > 1) {
      ToastUtil.showLoadingToast();
    } else {
      ToastUtil.dismissToast();
    }
  }, [isLoading]);

  useEffect(() => {
    if (successMsg) {
      ToastUtil.showSuccessToast(successMsg);
    }
  }, [successMsg]);

  const handleSelect = event => {
    if (isLoading || isProgress) return;

    const name = event.target.name;
    const newSubscription =
      selectedNewsLetters.indexOf(name) > -1
        ? selectedNewsLetters.filter(item => item !== name)
        : [...selectedNewsLetters, name];
    setPreferences(newSubscription);
  };

  const setPreferences = async (subscription: string[]) => {
    if (isLoading || isProgress) return;

    setIsProgress(true);
    setSuccessMsg("");

    try {
      const response = await fetch("/api/customer-io/preferences", {
        method: "PUT",
        body: JSON.stringify({
          email: user?.email,
          subscription,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new ToastableError(data.message, response.status);
      }

      // API call successful
      // Set isProgress to false to hide the "Processing..." message
      setIsProgress(false);
      setSelectedNewsLetters(subscription);
      setSuccessMsg("Newsletter preferences updated");
    } catch (error) {
      console.error("There was an error!", error);
      // Handle the error if needed
      // Set isProgress to false even if there's an error
      setIsProgress(false);
      setError(error);
    }
  };

  return (
    <>
      <p>Subscribe or unsubscribe to our newsletters</p>
      <div className={`checkboxRow`}>
        <label>
          <input
            type="checkbox"
            id="topicWires"
            name="Pirate Wires"
            checked={selectedNewsLetters.indexOf("Pirate Wires") > -1}
            onChange={handleSelect}
          />
          Pirate Wires
        </label>
      </div>
      <div className={`checkboxRow`}>
        <label>
          <input
            type="checkbox"
            id="topicWhitePill"
            name="The White Pill"
            checked={selectedNewsLetters.indexOf("The White Pill") > -1}
            onChange={handleSelect}
          />
          The White Pill
        </label>
      </div>
      <div className={`checkboxRow`}>
        <label>
          <input
            type="checkbox"
            id="topicIndustry"
            name="The Industry"
            checked={selectedNewsLetters.indexOf("The Industry") > -1}
            onChange={handleSelect}
          />
          The Industry
        </label>
      </div>
      <div className={`checkboxRow`}>
        <label>
          <input
            type="checkbox"
            id="topicDoloresPark"
            name="Dolores Park"
            checked={selectedNewsLetters.indexOf("Dolores Park") > -1}
            onChange={handleSelect}
          />
          Dolores Park
        </label>
      </div>
      <div className={`checkboxRow`}>
        <label>
          <input
            type="checkbox"
            id="topicImportantPirateWiresUpdates"
            name="Important Pirate Wires Updates"
            checked={
              selectedNewsLetters.indexOf("Important Pirate Wires Updates") > -1
            }
            onChange={handleSelect}
          />
          Important Pirate Wires Updates
        </label>
      </div>
      <Toast />
    </>
  );
};

export default EmailPreferences;

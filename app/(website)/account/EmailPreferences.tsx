'use client';

import { useState, useEffect, useReducer } from 'react';

export const EmailPreferences = ({ user }) => {
  const [selectedNewsLetters, setSelectedNewsLetters] = useState<String[]>([]);
  const [isProgress, setIsProgress] = useState(false);
  const [isLoading, setIsLoading] = useState(0);

  // Fetch and update user preferences on component mount
  useEffect(() => {
    setIsLoading(prev => prev + 1);
    // Make a GET request to fetch the user's preferences from the new API endpoint
    fetch(`/api/customer-io/preferences?email=${user.email}`)
      .then((response) => response.json())
      .then((data) => {
        const userPreferences = data.preferences;
        setSelectedNewsLetters(userPreferences);
        setIsLoading(prev => prev - 1);
      })
      .catch((error) => {
        console.error('Error fetching user preferences:', error);
        setIsLoading(prev => prev - 1);
      });
  }, [user.email]);

  const handleSelect = (event) => {
    if (isLoading || isProgress) return;

    const name = event.target.name;
    const newSubscription = selectedNewsLetters.indexOf(name) > -1
      ? selectedNewsLetters.filter((item) => item !== name)
      : [...selectedNewsLetters, name];
    setPreferences(newSubscription);
    setSelectedNewsLetters(newSubscription);
  };

  const setPreferences = async (subscription: string[]) => {
    if (isLoading || isProgress) return;

    setIsProgress(true);

    try {
      const response = await fetch('/api/customer-io/preferences', {
        method: 'PUT',
        body: JSON.stringify({
          email: user?.email,
          subscription
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // API call successful
      // Set isProgress to false to hide the "Processing..." message
      setIsProgress(false);
    } catch (error) {
      console.error('There was an error!', error);
      // Handle the error if needed
      // Set isProgress to false even if there's an error
      setIsProgress(false);
    }
  };

  return (
    <>
      {!!isLoading && (
        <div
          style={{
            position: 'absolute', // Changed to absolute
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: '100',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          Loading...
        </div>
      )}
      {isProgress && (
        <div
          style={{
            position: 'absolute', // Changed to absolute
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: '100',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          Processing...
        </div>
      )}
      <h3>Email Preferences</h3>
      <p>Subscribe or unsubscribe to our newsletters</p>
      <input
        type="checkbox"
        id="topic1"
        name="Wires"
        checked={selectedNewsLetters.indexOf('Wires') > -1}
        onChange={handleSelect}
      />
      <label>Wires</label>
      <br />
      <input
        type="checkbox"
        id="topic2"
        name="The White Pill"
        checked={selectedNewsLetters.indexOf('The White Pill') > -1}
        onChange={handleSelect}
      />
      <label>The White Pill</label>
      <br />
      <input
        type="checkbox"
        id="topic3"
        name="The Industry"
        checked={selectedNewsLetters.indexOf('The Industry') > -1}
        onChange={handleSelect}
      />
      <label>The Industry</label>
    </>
  );
};

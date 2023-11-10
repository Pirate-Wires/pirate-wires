'use client';

import { useState, useEffect, useCallback } from 'react';

export const EmailPreferences = ({ user }) => {
  const [selectedNewsLetters, setSelectedNewsLetters] = useState<String[]>([]);
  const [isProgress, setIsProgress] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch and update user preferences on component mount
  useEffect(() => {
    setIsLoading(true);
    // Make a GET request to fetch the user's preferences from the new API endpoint
    fetch(`/api/customer-io/preferences?email=${user.email}`)
      .then((response) => response.json())
      .then((data) => {
        const userPreferences = data.preferences;
        setSelectedNewsLetters(userPreferences);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching user preferences:', error);
        setIsLoading(false);
      });
  }, [user.email]);

  const handleSelect = (event) => {
    const name = event.target.name;
    setSelectedNewsLetters(
      selectedNewsLetters.indexOf(name) > -1
        ? selectedNewsLetters.filter((item) => item !== name)
        : [...selectedNewsLetters, name]
    );
  };

  const sendAPI = useCallback(async () => {
    try {
      const response = await fetch('/api/customer-io/preferences', {
        method: 'PUT',
        body: JSON.stringify({
          email: user?.email,
          subscription: selectedNewsLetters
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
  }, [selectedNewsLetters, user?.email]);


  useEffect(() => {
    if (!selectedNewsLetters.length) return;
    setIsProgress(true);
    sendAPI();
  }, [selectedNewsLetters, sendAPI]);

  return (
    <>
      {isLoading && (
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '30px',
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
            position: 'absolute',
            width: '100%',
            height: '30px',
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

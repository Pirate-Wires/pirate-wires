'use client';

import { useState, useEffect, useCallback } from 'react';

export const EmailPreferences = ({ user }) => {
  const [selectedNewsLetters, setSelectedNewsLetters] = useState<String[]>([]);
  const [isProgress, setIsProgress] = useState(false);

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
        const response = await fetch('/api/customer-io', {
            method: 'PUT',
            body: JSON.stringify({
              email: user?.email,
              existingUser: true,
              subscription: selectedNewsLetters
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        setIsProgress(true);
    } catch (error) {
        console.error('There was an error!', error);
    }
  }, [selectedNewsLetters, user?.email]);

  useEffect(() => {
    if (!selectedNewsLetters.length) return;
    setIsProgress(true);
    sendAPI();
  }, [selectedNewsLetters, sendAPI]);

  return (
    <>
      {isProgress && (
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '110px',
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
        name="The White Phill"
        checked={selectedNewsLetters.indexOf('The White Phill') > -1}
        onChange={handleSelect}
      />
      <label>The White Phill</label>
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

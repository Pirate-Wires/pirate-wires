// /app/(website)/account/EmailPreferences.tsx
import styles from '@/styles/pages/account.module.scss';
import { useState, useEffect } from 'react';

type EmailPreferencesProps = {
  user: { email: string };
};

export const EmailPreferences = ({ user }: EmailPreferencesProps) => {
  const [selectedNewsLetters, setSelectedNewsLetters] = useState<string[]>([]);
  const [isProgress, setIsProgress] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // Track errors

  const fetchUserPreferences = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/customer-io/preferences?email=${user.email}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch user preferences');
      }
      const data = await response.json();
      setSelectedNewsLetters(data.preferences); // Update UI after fetching preferences
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error('Error fetching user preferences:', error);
      setError('Failed to fetch preferences');
    } finally {
      setIsLoading(false);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchUserPreferences();
  }, [user.email]);

  const handleSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isLoading || isProgress) return;

    const name = event.target.name;
    let newSubscription: string[] = [];

    if (selectedNewsLetters.includes(name)) {
      newSubscription = selectedNewsLetters.filter((item) => item !== name);
    } else {
      newSubscription = [...selectedNewsLetters, name];
    }

    await setPreferences(newSubscription);
    setSelectedNewsLetters(newSubscription);
  };

  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [requestPayload, setRequestPayload] = useState<string | null>(null);

  const updateUserPreferences = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/customer-io/preferences?email=${user.email}`
      );
      if (!response.ok) {
        throw new Error('Failed to update user preferences');
      }
      const data = await response.json();
      setSelectedNewsLetters(data.preferences); // Update selectedNewsLetters after successful fetch
      setResponseMessage('Preferences updated successfully!'); // Set success message
    } catch (error) {
      console.error('Error updating user preferences:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const setPreferences = async (subscription: string[]) => {
    setIsProgress(true);
    try {
      const topics = {
        'Pirate Wires': 'topic_1',
        'The Industry': 'topic_2',
        'The White Pill': 'topic_3',
        'Dolores Park': 'topic_5',
        'Important Pirate Wires Updates': 'topic_4'
      };

      const updatedSubscription = Object.keys(topics).filter((key) =>
        subscription.includes(key)
      );

      const payload = {
        email: user?.email,
        subscription: updatedSubscription
      };

      const response = await fetch('/api/customer-io/preferences', {
        method: 'PUT',
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Update preferences first
      setSelectedNewsLetters(updatedSubscription);

      setIsProgress(false);
      await updateUserPreferences(); // Fetch preferences after successfully setting them
      setRequestPayload(
        JSON.stringify({ email: user?.email, subscription }, null, 2)
      ); // Set the request payload
    } catch (error) {
      console.error('Error setting preferences:', error);
      setIsProgress(false);
    }
  };

  return (
    <>
      {/* Display Loading or Progress Indicators */}
      {isLoading && (
        <LoadingOverlay message="Loading Newsletter Preferences..." />
      )}
      {isProgress && (
        <LoadingOverlay message="Updating Newsletter Preferences..." />
      )}

      <h3>Email Preferences</h3>
      <p>Subscribe or unsubscribe to our newsletters</p>
      <div className={styles.checkboxRow}>
        <input
          type="checkbox"
          id="topicWires"
          name="Pirate Wires"
          checked={selectedNewsLetters.indexOf('Pirate Wires') > -1}
          onChange={handleSelect}
        />
        <label>Pirate Wires</label>
      </div>
      <div className={styles.checkboxRow}>
        <input
          type="checkbox"
          id="topicWhitePill"
          name="The White Pill"
          checked={selectedNewsLetters.indexOf('The White Pill') > -1}
          onChange={handleSelect}
        />
        <label>The White Pill</label>
      </div>
      <div className={styles.checkboxRow}>
        <input
          type="checkbox"
          id="topicIndustry"
          name="The Industry"
          checked={selectedNewsLetters.indexOf('The Industry') > -1}
          onChange={handleSelect}
        />
        <label>The Industry</label>
      </div>
      <div className={styles.checkboxRow}>
        <input
          type="checkbox"
          id="topicDoloresPark"
          name="Dolores Park"
          checked={selectedNewsLetters.indexOf('Dolores Park') > -1}
          onChange={handleSelect}
        />
        <label>Dolores Park</label>
      </div>
      <div className={styles.checkboxRow}>
        <input
          type="checkbox"
          id="topicImportantPirateWiresUpdates"
          name="Important Pirate Wires Updates"
          checked={
            selectedNewsLetters.indexOf('Important Pirate Wires Updates') > -1
          }
          onChange={handleSelect}
        />
        <label>Important Pirate Wires Updates</label>
      </div>
    </>
  );
};

const LoadingOverlay = ({ message }: { message: string }) => (
  <div
    style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: '100',
      backgroundColor: '#FFF',
      color: '#000',
      border: '1px solid #000',
      padding: '10px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      maxWidth: '300px'
    }}
  >
    {message}
  </div>
);

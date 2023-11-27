// /app/(website)/sign-in/EmailInput.tsx
import React, {useState} from "react";

interface EmailInputProps {
  onSubmit: (e: React.FormEvent, email: string) => void;
  isLoading: boolean;
}

const EmailInput: React.FC<EmailInputProps> = ({onSubmit, isLoading}) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(e, email); // Pass the event object and email to the parent component
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        name="email"
        id="email"
        required
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Loading..." : "Send OTP"}
      </button>
    </form>
  );
};

export default EmailInput;

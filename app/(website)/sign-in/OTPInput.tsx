import React, { useState, useRef, ChangeEvent, KeyboardEvent, FormEvent } from 'react';

interface OTPInputProps {
  onOTPSubmit: (otp: string) => void;
}

const OTPInput: React.FC<OTPInputProps> = ({ onOTPSubmit }) => {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
  const inputRefs = Array.from({ length: 6 }, () => useRef<HTMLInputElement | null>(null));

  const handleChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
    const value = event.target.value;

    if (isNaN(Number(value))) {
      // Only allow numeric input
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus to the next input field if a digit is entered
    if (index < 5 && value !== '') {
      inputRefs[index + 1]?.current?.focus();
    }
  };

  const handleBackspace = (event: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (event.key === 'Backspace' && index > 0 && otp[index] === '') {
      inputRefs[index - 1]?.current?.focus();
    }
  };

  const handlePaste = (event: ClipboardEvent) => {
    const pastedData = event.clipboardData.getData('text');
    if (/^\d{6}$/.test(pastedData)) {
      // If the pasted data is a 6-digit numeric code, fill the OTP fields
      const newOtp = pastedData.split('');
      setOtp(newOtp);
      newOtp.forEach((value, index) => {
        if (inputRefs[index] && inputRefs[index].current) {
          inputRefs[index].current.value = value;
        }
      });
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    // Combine the OTP digits to form the full OTP code
    const fullOTP = otp.join('');
    onOTPSubmit(fullOTP); // Pass the OTP to the parent component for submission
  };

  return (
    <form onSubmit={handleSubmit}>
      {otp.map((value, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          value={value}
          onChange={(event) => handleChange(event, index)}
          onKeyUp={(event) => handleBackspace(event, index)}
          ref={inputRefs[index]}
          onPaste={handlePaste}
        />
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default OTPInput;

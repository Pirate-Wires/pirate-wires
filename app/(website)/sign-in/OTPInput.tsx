// /app/(website)/sign-in/OTPInput.tsx
import React, { useState, useRef, ChangeEvent, KeyboardEvent, FormEvent, ClipboardEventHandler } from 'react';

interface OTPInputProps {
  onOTPSubmit: (otp: string) => void;
}

const OTPInput: React.FC<OTPInputProps> = ({ onOTPSubmit }) => {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));

  const ref0 = useRef<HTMLInputElement>(null);
  const ref1 = useRef<HTMLInputElement>(null);
  const ref2 = useRef<HTMLInputElement>(null);
  const ref3 = useRef<HTMLInputElement>(null);
  const ref4 = useRef<HTMLInputElement>(null);
  const ref5 = useRef<HTMLInputElement>(null);

  const inputRefs = [ref0, ref1, ref2, ref3, ref4, ref5];

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

  const handlePaste = (event) => {
    const pastedData = event.clipboardData.getData('text');
    if (/^\d{6}$/.test(pastedData)) {
      // If the pasted data is a 6-digit numeric code, fill the OTP fields
      const newOtp = pastedData.split('');
      setOtp(newOtp);
      newOtp.forEach((value: string, index: number) => {
        const inputRef = inputRefs[index].current;
        if (inputRef) {
          inputRef.value = value;
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
    <>
      <h2>Confirm Your Sign In</h2>
      <p>We just sent a 6 digit code to your email</p>
      <form onSubmit={handleSubmit}>
        <div className="otp-input-container">

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
        </div>

        <button type="submit">Confirm</button>
        <a href="#">Resend Code</a>
      </form>
    </>
  );
};

export default OTPInput;

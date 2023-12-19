// /app/(website)/sign-in/OTPInput.tsx
import styles from "@/styles/pages/signIn.module.scss";
import React, { useState, useRef, ChangeEvent, KeyboardEvent } from "react";

interface OTPInputProps {
  onOTPChange: (otp: string) => void;
}

const OTPInput: React.FC<OTPInputProps> = ({ onOTPChange }) => {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));

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

    const fullOTP = newOtp.join("");
    onOTPChange(fullOTP);

    // Move focus to the next input field if a digit is entered
    if (index < 5 && value !== "") {
      inputRefs[index + 1]?.current?.focus();
    }
  };

  const handleBackspace = (event: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (event.key === "Backspace" && index > 0 && otp[index] === "") {
      inputRefs[index - 1]?.current?.focus();
    }
    inputRefs.map(item => item.current?.value).join("");
  };

  const handlePaste = event => {
    const pastedData = event.clipboardData.getData("text");
    if (/^\d{6}$/.test(pastedData)) {
      // If the pasted data is a 6-digit numeric code, fill the OTP fields
      const newOtp = pastedData.split("");
      setOtp(newOtp);
      newOtp.forEach((value: string, index: number) => {
        const inputRef = inputRefs[index].current;
        if (inputRef) {
          inputRef.value = value;
        }
      });
      inputRefs[inputRefs.length - 1].current?.focus();
      onOTPChange(pastedData);
    }
  };

  return (
    <div className={`otp-input-container`}>
      {otp.map((value, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          value={value}
          onChange={event => handleChange(event, index)}
          onKeyUp={event => handleBackspace(event, index)}
          ref={inputRefs[index]}
          onPaste={handlePaste}
        />
      ))}
    </div>
  );
};

export default OTPInput;

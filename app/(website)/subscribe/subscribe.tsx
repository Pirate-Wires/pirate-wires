'use client';
import React, { useEffect, useState } from 'react';

import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import StepFour from './StepFour';

const Subscribe = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [email, setEmail] = useState('');

  const onNextStep = (step: number) => {
    setCurrentStep(step);
  };

  const handleSubmitEmail = (value: string) => {
    setEmail(value);
  };

  const currentStepComponent = () => {
    switch (currentStep) {
      case 1:
        return (
          <StepOne onSubmitEmail={handleSubmitEmail} onNextStep={onNextStep} />
        );
      case 2:
        return <StepTwo email={email} onNextStep={onNextStep} />;
      case 3:
        return <StepThree onNextStep={onNextStep} />;
      case 4:
        return <StepFour email={email} />;
    }
  };

  return <>{currentStepComponent()}</>;
};

export default Subscribe;

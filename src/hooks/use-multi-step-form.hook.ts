import { useState } from "react";

export function useMultiStepForm(steps: Step[]) {
  // state
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  // next function
  function nextStep() {
    setCurrentStepIndex((currentStepIndex) => {
      return currentStepIndex < steps.length - 1
        ? currentStepIndex + 1
        : currentStepIndex;
    });
  }
  // back function
  function backStep() {
    setCurrentStepIndex((currentStepIndex) => {
      return currentStepIndex > 0 ? currentStepIndex - 1 : currentStepIndex;
    });
  }
  // goTo function
  function goTo(step: number) {
    setCurrentStepIndex(step);
  }
  // return the functions
  return {
    currentStep: steps[currentStepIndex],
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,
    nextStep,
    backStep,
    goTo,
  };
}

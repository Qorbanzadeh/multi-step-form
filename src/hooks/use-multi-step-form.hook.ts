import {
  // useEffect,
  useState,
} from "react";

export function useMultiStepForm(steps: Step[]) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  function nextStep() {
    setCurrentStepIndex((currentStepIndex) => {
      return currentStepIndex < steps.length - 1
        ? currentStepIndex + 1
        : currentStepIndex;
    });
  }

  function backStep() {
    setCurrentStepIndex((currentStepIndex) => {
      return currentStepIndex > 0 ? currentStepIndex - 1 : currentStepIndex;
    });
  }

  function goTo(step: number) {
    setCurrentStepIndex(step);
  }

  return {
    currentStep: steps[currentStepIndex],
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,
    nextStep,
    backStep,
    goTo,
  };
}

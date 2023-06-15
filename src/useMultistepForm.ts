import { ReactElement, useState } from "react";

export function useMultispetForm(steps: ReactElement[]) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const next = () => {
    if (currentStepIndex !== steps.length - 1)
      setCurrentStepIndex(currentStepIndex + 1);
  };

  const back = () => {
    if (currentStepIndex !== 0) setCurrentStepIndex(currentStepIndex - 1);
  };

  return {
    currentStepIndex,
    currentStep: steps[currentStepIndex],
    next,
    back,
    steps,
    isLastStep: currentStepIndex === steps.length - 1,
    isFirstStep: currentStepIndex === 0,
  };
}

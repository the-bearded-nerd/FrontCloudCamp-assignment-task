import cls from "./Stepper.module.css";
import { ReactComponent as CheckLogo } from "../../assets/Check.svg";
import { ReactComponent as DotLogo } from "../../assets/Dot.svg";

interface StepperProps {
  stepCount: number;
  activeStep: number;
}

const getStepperElementClassName = (
  currentStep: number,
  activeStep: number
) => {
  if (currentStep < activeStep)
    return `${cls["stepper-element-done"]} ${cls["stepper-element"]}`;
  if (currentStep === activeStep)
    return `${cls["stepper-element-active"]} ${cls["stepper-element"]}`;
  return `${cls["stepper-element-uncomplited"]} ${cls["stepper-element"]}`;
};

const getStepperElementContent = (currentStep: number, activeStep: number) => {
  if (currentStep < activeStep) return <CheckLogo />;
  if (currentStep === activeStep) return <DotLogo />;
  return null;
};

const getStepperLabelClass = (currentStep: number, activeStep: number) => {
  if (currentStep === activeStep)
    return `${cls["stepper-label"]} ${cls["active"]}`;
  if (currentStep < activeStep)
    return `${cls["stepper-label"]} ${cls["finished"]}`;
  return cls["stepper-label"];
};

export const Stepper = (props: StepperProps) => {
  const { stepCount, activeStep } = props;
  const steps = [];
  const labels = [];
  for (let i = 1; i <= stepCount; i++) {
    steps.push(
      <div key={i} className={getStepperElementClassName(i, activeStep)}>
        {getStepperElementContent(i, activeStep)}
      </div>
    );
    labels.push(
      <span key={i} className={getStepperLabelClass(i, activeStep)}>
        {i}
      </span>
    );
  }

  return (
    <div className={cls["stepper-container"]}>
      <progress
        className={cls["stepper-progress"]}
        max={stepCount - 1}
        value={activeStep - 1}
      ></progress>
      <div className={cls["stepper-marker-container"]}>{steps}</div>
      <div className={cls["stepper-label-container"]}>{labels}</div>
    </div>
  );
};

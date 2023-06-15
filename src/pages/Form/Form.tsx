import { useMultispetForm } from "../../useMultistepForm";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { ThemeButton, Button } from "../../components/Button/Button";
import { Stepper } from "../../components/Stepper/Stepper";
import { Step1 } from "./Step1/Step1";
import { Step2 } from "./Step2/Step2";
import { Step3 } from "./Step3/Step3";

import cls from "./Form.module.css";

export enum USER_SEX {
  man = "man",
  woman = "woman",
}

interface Description {
  description: string;
}

export type Inputs = {
  example: string;
  step1: string;
  step2: string;
  step3: string;
  nickname: string;
  name: string;
  surname: string;
  sex: USER_SEX;
  about: string;
  advantages: Description[];
  radio: number;
  checkbox: number[];
};

export const Form = () => {
  const navigate = useNavigate();
  const methods = useForm<Inputs>({
    defaultValues: {
      advantages: [
        { description: "" },
        { description: "" },
        { description: "" },
      ],
    },
  });
  const { handleSubmit } = methods;

  const {
    currentStepIndex,
    currentStep,
    isFirstStep,
    isLastStep,
    back,
    next,
    steps,
  } = useMultispetForm([<Step1 />, <Step2 />, <Step3 />]);

  const onSubmitHandler: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    if (isLastStep) alert("приехали");
    else next();
  };

  const onBackButtonClickHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isFirstStep) navigate("/");
    else back();
  };

  return (
    <div className={cls["form"]}>
      <div className={cls["form-container"]}>
        <Stepper stepCount={steps.length} activeStep={currentStepIndex + 1} />
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <div className={cls["step-container"]}>{currentStep}</div>

            <div className={cls["form-buttons"]}>
              <Button
                type="button"
                theme={ThemeButton.SECONADARY}
                onClick={onBackButtonClickHandler}
              >
                Назад
              </Button>
              <Button type="submit" theme={ThemeButton.PRIMARY}>
                {isLastStep ? "Отправить" : "Далее"}
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

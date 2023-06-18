import { useState } from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useMultispetForm } from "../../useMultistepForm";
import Modal from "../../components/Modal/Modal";
import { ThemeButton, Button } from "../../components/Button/Button";
import { Stepper } from "../../components/Stepper/Stepper";
import { Step1 } from "./Step1/Step1";
import { Step2 } from "./Step2/Step2";
import { Step3 } from "./Step3/Step3";
import {
  ResponseModalContent,
  ResponseModalContentProps,
} from "../../components/ResponseModalContent/ResponseModalContent";
import { USER_SEX } from "./types";

import cls from "./Form.module.css";

interface Description {
  description: string;
}

type Inputs = {
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
  const [isModalActive, setModalActive] = useState(false);
  const [modalContent, setModalContent] = useState(
    {} as ResponseModalContentProps
  );

  const openModal = () => {
    setModalActive(true);
  };

  const closeModal = () => {
    setModalActive(false);
  };

  const navigate = useNavigate();
  const methods = useForm<Inputs>({
    defaultValues: {
      advantages: [
        { description: "" },
        { description: "" },
        { description: "" },
      ],
      checkbox: [],
      radio: NaN,
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

  const onSubmitHandler: SubmitHandler<Inputs> = async (data) => {
    if (isLastStep) {
      const dataToSend = {
        ...data,
        advantages: data.advantages.map((adv) => Object.values(adv)[0]),
        radio: data.radio ? Number(data.radio) : NaN,
        checkbox: data.checkbox ? data.checkbox.map(Number) : [],
      };
      try {
        const response = await fetch(
          "https://api.sbercloud.ru/content/v1/bootcamp/frontend",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToSend),
          }
        );
        setModalContent({
          ok: response.ok,
          status: response.status,
          statusText: response.statusText,
        });
        openModal();
      } catch (error) {
        setModalContent({
          ok: false,
          statusText: "запрос не удался",
        });
      } finally {
        openModal();
      }
    } else next();
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
                id={"button-back"}
                type="button"
                theme={ThemeButton.SECONADARY}
                onClick={onBackButtonClickHandler}
              >
                Назад
              </Button>
              <Button
                id={isLastStep ? "button-send" : "button-next"}
                type="submit"
                theme={ThemeButton.PRIMARY}
              >
                {isLastStep ? "Отправить" : "Далее"}
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
      <Modal isActive={isModalActive} onClose={closeModal}>
        <ResponseModalContent {...modalContent} handleClose={closeModal} />
      </Modal>
    </div>
  );
};

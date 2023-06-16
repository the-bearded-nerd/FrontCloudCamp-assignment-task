import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import { useNavigate } from "react-router-dom";

import { Button, ThemeButton } from "../../components/Button/Button";
import { UserData } from "../../components/PersonalData/PersonalData";

import cls from "./MainPage.module.css";

interface MainPageInputs {
  phone: string;
  email: string;
}

export const MainPage = () => {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
  } = useForm<MainPageInputs>({
    defaultValues: {
      phone: "+7 (910) 456 5763",
      email: "dmitrykarvonen@gmail.com",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const onButtonClick = () => {
    navigate("/form");
  };

  return (
    <div className={cls["mainpage"]}>
      <div className={cls["mainpage-container"]}>
        <UserData />
        <form className={cls["field-container"]}>
          <div className={cls["field"]}>
            <label htmlFor="field-phone">Номер телефона</label>
            <InputMask
              id="field-phone"
              mask={"+7 (999) 999 9999"}
              alwaysShowMask={false}
              type="text"
              placeholder="phone"
              {...register("phone", {
                required: true,
                pattern: {
                  value: /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/,
                  message: "Incorrect phone number",
                },
              })}
              disabled
            />
            <p className={cls[`field-tip${errors.phone ? "" : "__hidden"}`]}>
              {errors.phone?.message}
            </p>
          </div>

          <div className={cls["field"]}>
            <label htmlFor="field-email">Email</label>
            <input
              id="field-email"
              type="email"
              placeholder="email"
              {...register("email", {
                required: true,
                pattern: {
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                  message: "Incorrect email",
                },
              })}
              disabled
            />
            <p className={cls[`field-tip${errors.email ? "" : "__hidden"}`]}>
              {errors.email?.message}
            </p>
          </div>
        </form>
        <div className={cls["mainpage-buttons"]}>
          <Button
            theme={ThemeButton.PRIMARY}
            onClick={onButtonClick}
            id="button-start"
            type="button"
          >
            Начать
          </Button>
        </div>
      </div>
    </div>
  );
};

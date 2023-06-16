import {
  useFormContext,
  RegisterOptions,
  useController,
} from "react-hook-form";

import { TextInput } from "../../../components/TextInput/TextInput";
import Select from "../../../components/Select/Select";

import cls from "../Form.module.css";

const sexOptions = [
  { title: "man", value: "man" },
  { title: "woman", value: "woman" },
];

const NicknameRegisterOptions: RegisterOptions = {
  required: true,
  pattern: /^[A-Za-z0-9]+$/i,
  maxLength: 30,
};

const NameAndSurnameRegisterOptions: RegisterOptions = {
  required: true,
  pattern: /^[A-Za-z]+$/i,
  maxLength: 50,
};

export const Step1 = () => {
  const {
    formState: { errors },
    control,
  } = useFormContext();

  const {
    field: { value: sexValue, onChange: sexOnChange, ref, ...restSexField },
  } = useController({ name: "sex", control, rules: { required: true } });

  return (
    <div className={cls["field-container"]}>
      <TextInput
        label="Nickname"
        name="nickname"
        placeholder="some placeholder here..."
        hasTip
        tip={errors.nickname && "Bad nickname"}
        registerOptions={NicknameRegisterOptions}
      />

      <TextInput
        label="Name"
        name="name"
        placeholder="some placeholder here..."
        hasTip
        tip={errors.name && "Bad name"}
        registerOptions={NameAndSurnameRegisterOptions}
      />

      <TextInput
        label="Surname"
        name="surname"
        placeholder="some placeholder here..."
        hasTip
        tip={errors.surname && "Bad surname"}
        registerOptions={NameAndSurnameRegisterOptions}
      />

      <div className={cls["field"]}>
        <label>Sex</label>
        <Select
          id="field-sex"
          options={sexOptions}
          selected={sexOptions.find((item) => item.value === sexValue) || null}
          onChange={(option) => {
            sexOnChange(option);
          }}
          placeholder="Не выбрано"
          {...restSexField}
        />
        <p className={cls[`tip${errors.sex ? "" : "-hidden"}`]}>
          Need some sex
        </p>
      </div>
    </div>
  );
};

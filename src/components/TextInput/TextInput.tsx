import { FC } from "react";
import { useFormContext, RegisterOptions } from "react-hook-form";

import cls from "./TextInput.module.css";

interface TextInputProps {
  name: string;
  registerName?: string;
  registerOptions?: RegisterOptions;
  label?: string;
  placeholder?: string;
  tip?: string;
  disabled?: boolean;
  hasTip?: boolean;
}

export const TextInput: FC<TextInputProps> = ({
  placeholder,
  name,
  registerName,
  registerOptions,
  label,
  tip,
  disabled,
  hasTip,

  ...props
}) => {
  const { register } = useFormContext();
  return (
    <div className={cls["field"]}>
      {label && <label htmlFor={`field-${name}`}>{label}</label>}
      <input
        id={`field-${name}`}
        placeholder={placeholder || ""}
        className={cls["field-input"]}
        {...register(registerName || name, registerOptions)}
        {...props}
      />
      {hasTip && !disabled && (
        <p className={cls[`field-tip${tip ? "" : "__hidden"}`]}>{tip}</p>
      )}
    </div>
  );
};

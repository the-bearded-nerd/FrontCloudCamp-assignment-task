import { FC, InputHTMLAttributes } from "react";

import cls from "./Input.module.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  tip?: string;
}

export const Input: FC<InputProps> = (props) => {
  const { label, tip, ...otherProps } = props;
  const { id } = otherProps;
  return (
    <div className={cls["input-container"]}>
      {label && (
        <label htmlFor={id} className={cls["input-label"]}>
          {label}
        </label>
      )}
      <input className={cls["input"]} {...otherProps} />
      {tip && <p className={cls["input-tip"]}>{tip}</p>}
    </div>
  );
};

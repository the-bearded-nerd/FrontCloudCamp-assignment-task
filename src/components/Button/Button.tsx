import { FC } from "react";

import cls from "./Button.module.css";

import { ButtonHTMLAttributes } from "react";

export enum ThemeButton {
  PRIMARY = "primary",
  SECONADARY = "secondary",
  SECONDARY_SQUARE = "secondary_square",
  CLEAR = "clear",
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme?: ThemeButton;
}

export const Button: FC<ButtonProps> = (props) => {
  const { className, children, theme, ...otherProps } = props;
  return (
    <button
      className={`${cls.Button} ${theme ? cls[theme] : ""} ${
        className ? className : ""
      }`}
      {...otherProps}
    >
      {children}
    </button>
  );
};

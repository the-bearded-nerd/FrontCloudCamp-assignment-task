import { useFormContext } from "react-hook-form";

import cls from "./Checkbox.module.css";

interface CheckboxProps {
  count: number;
}

export const CheckboxGroup = ({ count }: CheckboxProps) => {
  const { register } = useFormContext();
  const checkboxes = [];
  for (let i = 1; i <= count; i++) {
    checkboxes.push(
      <label
        key={i}
        className={cls["checkbox-label"]}
        htmlFor={`field-checkbox-group-option-${i}`}
      >
        <input
          className={cls["checkbox"]}
          type="checkbox"
          id={`field-checkbox-group-option-${i}`}
          value={i}
          {...register("checkbox")}
        />
        {i}
      </label>
    );
  }

  return (
    <div className={cls["checkbox-group"]}>
      <p>Checkbox group</p>
      {checkboxes}
    </div>
  );
};

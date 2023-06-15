import { useFormContext } from "react-hook-form";

import cls from "./RadioGroup.module.css";

interface RadioProps {
  count: number;
}

export const RadioGroup = ({ count }: RadioProps) => {
  const { register } = useFormContext();
  const radios = [];
  for (let i = 1; i <= count; i++) {
    radios.push(
      <label
        key={i}
        className={cls["radio-label"]}
        htmlFor={`field-radio-group-option-${i}`}
      >
        <input
          className={cls["radio"]}
          type="radio"
          id={`field-radio-group-option-${i}`}
          value={i}
          {...register("radio")}
        />
        {i}
      </label>
    );
  }

  return (
    <div className={cls["radio-group"]}>
      <p>Radio group</p>
      {radios}
    </div>
  );
};

import { useState } from "react";
import { useFormContext } from "react-hook-form";

import cls from "../Form.module.css";

const isMaxLength = (text: string) => text.replaceAll(" ", "").length <= 200;

export const Step3 = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const [charCount, setCharCount] = useState(0);

  const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCharCount(e.target.value.replaceAll(" ", "").length);
  };

  console.log(errors);

  return (
    <div className={cls["field"]}>
      <label htmlFor="field-about">About</label>
      <textarea
        id="field-about"
        cols={30}
        rows={10}
        {...register("about", {
          validate: isMaxLength,
          onChange: onChangeHandler,
        })}
      ></textarea>
      <div className={cls["textarea-counter"]}>{charCount}</div>
      <p className={cls[`tip${errors.about ? "" : "-hidden"}`]}>
        Too long text
      </p>
    </div>
  );
};

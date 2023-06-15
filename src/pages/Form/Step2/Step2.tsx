import { useFieldArray, useFormContext } from "react-hook-form";

import { CheckboxGroup } from "../CheckboxGroup/CheckboxGroup";
import { RadioGroup } from "../RadioGroup/RadioGroup";
import { Button, ThemeButton } from "../../../components/Button/Button";
import { TextInput } from "../../../components/TextInput/TextInput";

import { ReactComponent as PlusLogo } from "../../../assets/Plus.svg";
import { ReactComponent as TrashLogo } from "../../../assets/Trash.svg";
import cls from "../Form.module.css";

export const Step2 = () => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "advantages",
  });
  return (
    <div className={cls["field-container-wide"]}>
      <div className={cls["field"]} id="advantages-field">
        <h3>Advantages</h3>
        {fields.map((item, index) => {
          return (
            <div className={cls["advantage"]} key={item.id}>
              <TextInput
                name={`field-advantages-${index + 1}`}
                registerName={`advantages.${index}.description`}
              />
              <Button
                id={`button-remove-${index + 1}`}
                type="button"
                theme={ThemeButton.CLEAR}
                onClick={() => {
                  remove(index);
                }}
              >
                <TrashLogo />
              </Button>
            </div>
          );
        })}
        <Button
          id={`button-add`}
          type="button"
          theme={ThemeButton.SECONDARY_SQUARE}
          onClick={() => append({ description: "" })}
        >
          <PlusLogo />
        </Button>
      </div>
      <CheckboxGroup count={3} />
      <RadioGroup count={3} />
    </div>
  );
};

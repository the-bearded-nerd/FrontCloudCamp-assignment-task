import { useState, useEffect, useRef } from "react";
import type { MouseEventHandler } from "react";

import { ReactComponent as ArrowDown } from "./assets/arrow-down.svg";
import Styles from "./Select.module.css";

type Option = {
  title: string;
  value: string;
};
type OptionProps = {
  parentId?: string;
  option: Option;
  onClick: (value: Option["value"]) => void;
};
const OptionEl = (props: OptionProps) => {
  const {
    option: { value, title },
    onClick,
    parentId,
  } = props;
  const optionRef = useRef<HTMLLIElement>(null);

  const handleClick =
    (clickedValue: Option["value"]): MouseEventHandler<HTMLLIElement> =>
    () => {
      onClick(clickedValue);
    };

  useEffect(() => {
    const option = optionRef.current;
    if (!option) return;
    const handleEnterKeyDown = (event: KeyboardEvent) => {
      if (document.activeElement === option && event.key === "Enter") {
        onClick(value);
      }
    };

    option.addEventListener("keydown", handleEnterKeyDown);
    return () => {
      option.removeEventListener("keydown", handleEnterKeyDown);
    };
  }, [value, onClick]);

  return (
    <li
      className={Styles.option}
      id={parentId ? `${parentId}-option-${value}` : undefined}
      value={value}
      onClick={handleClick(value)}
      tabIndex={0}
      ref={optionRef}
    >
      {title}
    </li>
  );
};

type SelectProps = {
  selected: Option | null;
  options: Option[];
  placeholder?: string;
  status?: "default" | "invalid";
  id?: string;
  onChange?: (selected: Option["value"]) => void;
  onClose?: () => void;
};

const Select = (props: SelectProps) => {
  const {
    options,
    placeholder,
    status = "default",
    selected,
    onChange,
    onClose,
    id,
  } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const { target } = event;
      if (target instanceof Node && !rootRef.current?.contains(target)) {
        isOpen && onClose?.();
        setIsOpen(false);
      }
    };

    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [onClose]);

  useEffect(() => {
    const placeholderEl = placeholderRef.current;
    if (!placeholderEl) return;

    const handleEnterKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        setIsOpen((prev) => !prev);
      }
    };
    placeholderEl.addEventListener("keydown", handleEnterKeyDown);

    return () => {
      placeholderEl.removeEventListener("keydown", handleEnterKeyDown);
    };
  }, []);

  const handleOptionClick = (value: Option["value"]) => {
    setIsOpen(false);
    onChange?.(value);
  };
  const handlePlaceHolderClick: MouseEventHandler<HTMLDivElement> = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div
      className={Styles.selectWrapper}
      ref={rootRef}
      data-is-active={isOpen}
      id={id}
    >
      <div className={Styles.arrow} onClick={handlePlaceHolderClick}>
        <ArrowDown />
      </div>
      <div
        className={Styles.placeholder}
        data-status={status}
        data-selected={!!selected?.value}
        onClick={handlePlaceHolderClick}
        role="button"
        tabIndex={0}
        ref={placeholderRef}
      >
        {selected?.title || placeholder}
      </div>
      {isOpen && (
        <ul className={Styles.select}>
          {options.map((option) => (
            <OptionEl
              key={option.value}
              parentId={id}
              option={option}
              onClick={handleOptionClick}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;

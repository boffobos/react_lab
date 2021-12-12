import { ChangeEvent } from "react";
import style from "./style.module.css";

interface Props {
  groupName: string;
  options: {
    label: string;
    value: string | number;
    selected?: boolean | undefined;
  }[];
  onChange: Function;
  value: string | number;
}

export const CustomRadioButtons = ({ options, onChange, groupName, value }: Props) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e);
  };
  return (
    <form className={style.container} action="">
      {options.map((option) => {
        return (
          <div key={option.value} className={style.radioGroup}>
            <input
              type="radio"
              id={`${option.value}`}
              value={option.value}
              name={groupName}
              className={style.radioBtn}
              onChange={handleChange}
              checked={value === option.value}
            />
            <label htmlFor={`${option.value}`}>{option.label}</label>
          </div>
        );
      })}
    </form>
  );
};

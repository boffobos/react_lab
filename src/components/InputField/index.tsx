import style from "./style.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactElement, ReactEventHandler } from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

export interface IInputField {
  name: string;
  label: string;
  faIcon?: IconProp;
  type: string;
}

interface Props {
  options: IInputField;
  value: string;
  onChange: ReactEventHandler;
}

export const InputField = ({ options, value, onChange }: Props): ReactElement => {
  // let label = "Login";
  return (
    <div className={style.container}>
      <label htmlFor={options.name}>{options.label}</label>
      <input
        className={style.input}
        id={options.name}
        onChange={onChange}
        type={options.type}
        name={options.name.toLowerCase()}
        value={value}
      />
      {options.faIcon ? <FontAwesomeIcon icon={options.faIcon} className={style.icon} /> : null}
    </div>
  );
};

import style from "./style.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactElement, ReactEventHandler, useEffect, useRef } from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

export interface IInputField {
  name: string;
  label: string;
  faIcon?: IconProp;
  type: string;
  autofocus?: boolean | undefined;
}

interface Props {
  options: IInputField;
  value: string;
  onChange: ReactEventHandler;
}

export const InputField = ({ options, value, onChange }: Props): ReactElement => {
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
        autoFocus={options.autofocus}
      />
      {options.faIcon ? <FontAwesomeIcon icon={options.faIcon} className={style.icon} /> : null}
    </div>
  );
};

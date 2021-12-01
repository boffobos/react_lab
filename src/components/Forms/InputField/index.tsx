import style from "./style.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactElement, ReactEventHandler, useEffect, useRef } from "react";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { formErrorIcon } from "@/config/config";

export interface IInputField {
  name: string;
  label: string;
  faIcon?: IconDefinition;
  type: string;
  autofocus?: boolean | undefined;
}

interface Props {
  options: IInputField;
  value: string;
  onChange: ReactEventHandler;
  errorMessage?: string;
}

export const InputField = ({ options, value, onChange, errorMessage }: Props): ReactElement => {
  //errorMessage = "Password too short ";
  return (
    <>
      <div className={style.container}>
        <div className={style.groupControl}>
          <label htmlFor={options.name}>{options.label}</label>
          <input
            className={style.input}
            id={options.name}
            onChange={onChange}
            type={options.type}
            name={options.name}
            value={value}
            autoFocus={options.autofocus}
          />

          {options.faIcon && !errorMessage ? (
            <FontAwesomeIcon
              style={{ display: `${errorMessage ? "none" : "inline-block"}` }}
              icon={options.faIcon}
              className={style.icon}
            />
          ) : errorMessage ? (
            <FontAwesomeIcon icon={formErrorIcon} className={style.errorIcon} />
          ) : null}
        </div>
        {errorMessage ? <span className={style.errorMessage}>{errorMessage}</span> : null}
      </div>
    </>
  );
};

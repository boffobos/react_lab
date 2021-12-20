import style from "./style.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, ReactElement, useEffect, useState } from "react";
import { formErrorIcon } from "@/config/config";
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
  onChange: Function;
}

export const InputField = ({ options, value, onChange }: Props): ReactElement => {
  const [error, setError] = useState("");
  const errorSetterForParents = (message = "") => {
    setError(message);
  };

  const fakeEvent = {
    target: {
      value: "",
      name: options.name,
    },
  };

  useEffect(() => {
    onChange(fakeEvent, errorSetterForParents);
  }, []);

  //onChange(fakeEvent, errorSetterForParents);

  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e, errorSetterForParents);
  };
  //errorMessage = "Password too short ";
  return (
    <>
      <div className={style.container}>
        <div className={style.groupControl}>
          <label htmlFor={options.name}>{options.label}</label>
          <input
            className={style.input}
            id={options.name}
            onChange={inputHandler}
            type={options.type}
            name={options.name}
            value={value}
            autoFocus={options.autofocus}
          />

          {options.faIcon && !error ? (
            <FontAwesomeIcon
              style={{ display: `${error ? "none" : "inline-block"}` }}
              icon={options.faIcon}
              className={style.icon}
            />
          ) : error ? (
            <FontAwesomeIcon icon={formErrorIcon} className={style.errorIcon} />
          ) : null}
        </div>
        {error ? <span className={style.errorMessage}>{error}</span> : null}
      </div>
    </>
  );
};

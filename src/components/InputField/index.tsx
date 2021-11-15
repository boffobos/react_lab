import style from "./style.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { ReactElement } from "react";

export interface IInputField {
  name: string;
  label: string;
  faIcon?: IconDefinition;
  type: string;
}

interface Props {
  options: IInputField;
}

export const InputField = ({ options }: Props): ReactElement => {
  // let label = "Login";

  return (
    <div className={style.container}>
      <label htmlFor={options.name}>{options.label}</label>
      <input type={options.type} name={options.name.toLowerCase()} className={style.input} id={options.name} />
      {options.faIcon ? <FontAwesomeIcon icon={options.faIcon} className={style.icon} /> : null}
    </div>
  );
};

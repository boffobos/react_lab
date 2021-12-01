import { FormEvent, FormEventHandler, useState } from "react";
import style from "./style.module.css";
import { InputField, IInputField } from "../../components";

export interface IFormContent {
  button: { type: "submit" | "button" | "reset" | undefined; text: string };
  children: IInputField[];
}

export interface IFormMaker extends IFormContent {
  formFieldOptions: IFormContent;
  onSubmit: Function;
}

interface IState {
  login: string;
  password: string;
  rePassword?: string;
  newPassword?: string;
}

export const FormMaker = ({ formFieldOptions, onSubmit }: IFormMaker) => {
  const [formState, setFormState] = useState<IState | {}>({});

  const inputs = formFieldOptions;

  /* Making input fields in form controlled by form container */
  const hanleInputChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setFormState({ ...formState, [name]: value || "" });
  };

  const handleFormOnSubmit: FormEventHandler = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formState);
  };

  return (
    <>
      <form /*!!!*/ autoComplete="off" action="" className={style.form} onSubmit={handleFormOnSubmit}>
        {inputs.children.map((item) => {
          const inputName = item.name;
          return (
            <InputField key={item.name} options={item} onChange={hanleInputChange} value={formState[item.name] || ""} />
          );
        })}
        <button type={inputs.button.type}>{inputs.button.text}</button>
      </form>
    </>
  );
};

import { ChangeEvent, FormEvent, FormEventHandler, useEffect, useState } from "react";
import style from "./style.module.css";
import { InputField, IInputField } from "../../components";

export interface IFormMaker {
  formFieldOptions: {
    button: { type: "submit" | "button" | "reset" | undefined; text: string };
    children: IInputField[];
  };
  onSubmit: Function;
}

interface IState {
  login: string;
  password: string;
  rePassword?: string;
  newPassword?: string;
  formNotification?: Function;
}

export const FormMaker = ({ formFieldOptions, onSubmit }: IFormMaker) => {
  const [formState, setFormState] = useState<IState>({} as IState);

  const inputs = formFieldOptions;

  /* Making input fields in form controlled by form container */
  const hanleInputChange = (e: ChangeEvent<HTMLInputElement>, errorSetter: Function) => {
    const value = e.target.value;
    const name = e.target.name;
    setFormState((prevState) => ({ ...prevState, [name]: value || "", [name + "ErrorSetter"]: errorSetter }));
  };

  const handleFormOnSubmit: FormEventHandler = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formState);
  };

  /*send function for notification on render */
  useEffect(() => {
    onSubmit(formState);
  }, []);

  return (
    <>
      <form /*!!!*/ autoComplete="off" action="" className={style.form} onSubmit={handleFormOnSubmit}>
        {inputs.children.map((item) => {
          return (
            <InputField key={item.name} options={item} onChange={hanleInputChange} value={formState[item.name] || ""} />
          );
        })}
        <button type={inputs.button.type}>{inputs.button.text}</button>
      </form>
    </>
  );
};

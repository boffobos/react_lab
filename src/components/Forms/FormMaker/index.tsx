import { FormEvent, FormEventHandler, useEffect, useState } from "react";
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
  formNotification?: Function;
}

export const FormMaker = ({ formFieldOptions, onSubmit }: IFormMaker) => {
  const [formState, setFormState] = useState<IState>({} as IState);
  const [notification, setNotification] = useState("");

  const inputs = formFieldOptions;

  /* Making input fields in form controlled by form container */
  const hanleInputChange = (e, errorSetter) => {
    const value = e.target.value;
    const name = e.target.name;
    setFormState((prevState) => ({ ...prevState, [name]: value || "", [name + "ErrorSetter"]: errorSetter }));
    // console.log(formState);
  };

  const handleFormOnSubmit: FormEventHandler = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formState);
  };
  //send function for notification on render
  useEffect(() => {
    setFormState((state) => ({ ...state, formNotification: setNotification }));
    onSubmit(formState);
  }, []);

  return (
    <>
      <form /*!!!*/ autoComplete="off" action="" className={style.form} onSubmit={handleFormOnSubmit}>
        {notification ? <div className={style.notify}>{notification}</div> : null}
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

import { FormEventHandler, useState } from "react";
import style from "./style.module.css";
import { InputField, IInputField } from "../components";

interface IFormContent {
  button: { type: "submit" | "button" | "reset" | undefined; text: string };
  children: IInputField[];
}

interface IFormMaker extends IFormContent {
  formFieldOptions: IFormContent;
  handlerForm: FormEventHandler;
  closeModal: Function;
}

export const FormMaker = ({ formFieldOptions, handlerForm, closeModal }: IFormMaker) => {
  const [formState, setFormState] = useState({});

  const fields = formFieldOptions;

  /* Making input fields in form controlled by form container */
  const hanleInputChange = (e) => {
    const value = e.target.value;
    setFormState({ ...formState, [e.target.name]: value });
  };

  const handleFormOnSubmit = (e: FormDataEvent) => {
    e.preventDefault();
    handlerForm(formState["login"]);
    closeModal();
  };

  return (
    <>
      <form /*!!!*/ autoComplete="off" action="" className={style.form} onSubmit={handleFormOnSubmit}>
        {fields.children.map((item) => {
          const inputName = item.name;
          return (
            <InputField key={item.name} options={item} onChange={hanleInputChange} value={formState[inputName] || ""} />
          );
        })}
        <button type={fields.button.type}>{fields.button.text}</button>
      </form>
    </>
  );
};

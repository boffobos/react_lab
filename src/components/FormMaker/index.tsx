import { FormEventHandler } from "react";
import style from "./style.module.css";
import { InputField, IInputField } from "../components";
import { faIdCard, faLock } from "@fortawesome/free-solid-svg-icons";

interface Props {
  button: { type: "submit" | "button" | "reset" | undefined; text: string };
  onSubmit: FormEventHandler;
  children: IInputField[];
}

interface Prop extends Props {
  props: Props;
}

export const FormMaker = ({ props }: Prop) => {
  /*
  const text = "Submit";
  const btnType = "submit";
  const onSubmitf = (e) => {
    e.prevetDefauld();
    alert("Form sent");
  };
  */

  const opt = props;
  /*
   {
    button: { type: "submit", text: "Register" },
    onSubmit: onSubmitf,
    children: [
      { name: "login", label: "Login", faIcon: faIdCard, type: "text" },
      { name: "password", label: "Password", faIcon: faLock, type: "password" },
      { name: "re-password", label: "Repeat Password", faIcon: faLock, type: "password" },
    ],
   };
   */

  return (
    <>
      <form /*autoComplete="off"*/ action="" className={style.form} onSubmit={(e) => opt.onSubmit(e)}>
        {opt.children.map((item, index) => (
          <InputField key={index} options={item} />
        ))}
        <button type={opt.button.type}>{opt.button.text}</button>
      </form>
    </>
  );
};

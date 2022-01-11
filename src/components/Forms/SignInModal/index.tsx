import style from "./style.module.css";
import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Modal, CustomInput, CustomButton, useNotification } from "../../components";
import { faLock, faIdCard } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { NavigateFunction } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { IFormState } from "@/pages/pages";
import { Formik, Form } from "formik";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface ISignInModal {
  isOpen: boolean;
  onClose: Function;
  handlerLogin?: Function;
  navigate?: NavigateFunction;
}

export const SignInModal = ({ isOpen, onClose /* navigate */ }: ISignInModal) => {
  const [formState, setFormState] = useState({} as IFormState);
  const sendNotification = useNotification();
  const form = {
    button: { type: "submit", text: "Login" },
    children: [
      { name: "login", label: "Login", faIcon: faIdCard, type: "text", autofocus: true },
      { name: "password", label: "Password", faIcon: faLock, type: "password" },
    ],
  };

  const sendDataToServer = (data = { login: "", password: "" } as IFormState) => {
    axios
      .post("/api/auth/signIn/", {
        login: data.login,
        password: data.password,
      })
      .then((res) => {
        // res.data is user info sent from server
        setUserName(res.data.body);
        onClose();
      })
      .catch((e) => {
        if (e.name === "AbortError") {
          console.log("Aborted successfuly!");
        } else {
          console.log("Wrong username or password");
          sendNotification({ message: "Wrong username or password", status: "error" });
        }
      });
  };

  //using redux store for login
  const dispatch = useDispatch();
  const setUserName = (user: { login: string; id: number; avatar: string }) => {
    dispatch({ type: "users/login", payload: user });
  };

  useEffect(() => {
    if (!(formState && Object.keys(formState).length === 0 && Object.getPrototypeOf(formState) === Object.prototype)) {
      return sendDataToServer(formState);
    }
  }, [formState.password, formState.login]);

  const signInSchema = Yup.object().shape({
    login: Yup.string().trim().required("Enter your login!"),
    password: Yup.string().trim().required("Enter your password!"),
  });

  return ReactDOM.createPortal(
    <Modal modalName="Sign In" isOpen={isOpen} onClose={onClose}>
      <Formik
        initialValues={{ login: "", password: "" } as IFormState}
        validationSchema={signInSchema}
        onSubmit={setFormState}
      >
        <Form className={style.form}>
          {form.children.map((input) => (
            <CustomInput
              key={input.name}
              type={input.type}
              label={input.label}
              name={input.name}
              id={input.name}
              faIcon={input.faIcon as IconProp}
              autoFocus={input.autofocus}
            />
          ))}
          <CustomButton className={style.btn} type="submit" title="Log in" />
        </Form>
      </Formik>
    </Modal>,
    document.body
  );
};

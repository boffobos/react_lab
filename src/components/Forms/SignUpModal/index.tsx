import ReactDOM from "react-dom";
import style from "./style.module.css";
import { useState, useEffect } from "react";
import { Modal, CustomButton, CustomInput } from "../../components";
import { faIdCard, faLock } from "@fortawesome/free-solid-svg-icons";
import * as Yup from "yup";
import axios from "axios";
import { NavigateFunction } from "react-router";
import { useDispatch } from "react-redux";
import { PASSWORD_LENGTH } from "../../../constants";
import { IFormState } from "@/pages/pages";
import { Formik, Form } from "formik";

interface ISignUpModal {
  isOpen: boolean;
  onClose: Function;
  handlerRegister?: Function;
  navigate: NavigateFunction;
}

export const SignUpModal = ({ isOpen, onClose, navigate }: ISignUpModal) => {
  const [formState, setFormState] = useState({} as IFormState);
  /* props for making appropriate signup form */
  const form = {
    button: { type: "submit", text: "Register" },
    children: [
      { name: "login", label: "Login", faIcon: faIdCard, type: "text", autofocus: true },
      { name: "password", label: "Password", faIcon: faLock, type: "password" },
      { name: "rePassword", label: "Repeat Password", faIcon: faLock, type: "password" },
    ],
  };

  const signUpSchema = Yup.object().shape({
    login: Yup.string().trim().min(2, "Too short!").max(128, "Too long!").required("Required!"),
    password: Yup.string()
      .trim()
      .min(PASSWORD_LENGTH, `Password require at least ${PASSWORD_LENGTH} characters`)
      .required("Required!"),
    rePassword: Yup.string()
      .trim()
      .oneOf([Yup.ref("password"), null], "Passwords don't match")
      .required("Required!"),
  });
  /* using redux store dispatch*/
  const dispatch = useDispatch();
  const setUserName = (user = null) => {
    dispatch({ type: "users/login", payload: user });
  };

  const sendDataToServer = (data = { login: "", password: "" }) => {
    axios
      .put("/api/auth/signUp", data /*, { signal: signal }*/)
      .then((res) => {
        // res.data is user info sent from server
        setUserName(res.data);
        navigate("/profile");
        onClose();
      })
      .catch((e) => {
        if (e.name === "AbortError") {
          console.log("Aborted successfuly!");
        } else {
          console.log("error with registration during sending data to server");
          console.log(e);
        }
      });
  };

  const submitData = (data = { login: "", password: "" }) => {
    setFormState((state) => ({
      ...state,
      login: data.login,
      password: data.password,
    }));
  };

  useEffect(() => {
    if (!(formState && Object.keys(formState).length === 0 && Object.getPrototypeOf(formState) === Object.prototype)) {
      sendDataToServer({ login: formState.login || "", password: formState.password || "" });
    }
  }, [formState.login, formState.password]);

  return ReactDOM.createPortal(
    <Modal className={style.container} modalName="Sign Up" isOpen={isOpen} onClose={onClose}>
      <Formik
        initialValues={{
          login: "",
          password: "",
          rePassword: "",
        }}
        validationSchema={signUpSchema}
        onSubmit={submitData}
      >
        <Form className={style.form}>
          {form.children.map((input) => {
            return (
              <CustomInput
                type={input.type}
                label={input.label}
                name={input.name}
                id={input.name}
                faIcon={input.faIcon}
                autofocus={input.autofocus}
              />
            );
          })}
          <CustomButton className={style.button} title="Register" type="submit" />
        </Form>
      </Formik>
    </Modal>,
    document.body
  );
};

import ReactDOM from "react-dom";
import style from "./style.module.css";
import { useState, useEffect } from "react";
import { Modal, FormMaker, CustomButton } from "../../components";
import { faIdCard, faLock, faExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { string as yup } from "yup";
import * as yup from "yup";
import axios from "axios";
import { NavigateFunction } from "react-router";
import { useDispatch } from "react-redux";
import { PASSWORD_LENGTH } from "../../../constants";
import { IFormState } from "@/pages/pages";
import { Formik, Form, Field, ErrorMessage } from "formik";

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

  const signUpSchema = yup.object().shape({
    login: yup.string().trim().min(2, "Too short!").max(128, "Too long!").required("Required!"),
    password: yup.string().trim().min(PASSWORD_LENGTH, `Password require at least ${PASSWORD_LENGTH} characters`),
    rePassword: yup
      .string()
      .trim()
      .oneOf([yup.ref("password"), null], "Passwords don't match"),
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
      sendDataToServer({ login: formState.login, password: formState.password });
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
        {({ errors }) => (
          <Form className={style.form}>
            <div className={style.groupControl}>
              <label htmlFor="login">Login</label>
              <Field className={style.input} type="text" id="login" name="login" />
              {!errors.login ? (
                <FontAwesomeIcon
                  style={{ display: `${errors.login ? "none" : "inline-block"}` }}
                  icon={faIdCard}
                  className={style.icon}
                />
              ) : (
                <FontAwesomeIcon title={errors.login} icon={faExclamation} className={style.errorIcon} />
              )}
            </div>
            <ErrorMessage className={style.errorMessage} name="login" component="div" />
            <div className={style.groupControl}>
              <label htmlFor="password">Password</label>
              <Field className={style.input} type="password" id="password" name="password" />
              {!errors.password ? (
                <FontAwesomeIcon
                  style={{ display: `${errors.password ? "none" : "inline-block"}` }}
                  icon={faLock}
                  className={style.icon}
                />
              ) : (
                <FontAwesomeIcon title={errors.password} icon={faExclamation} className={style.errorIcon} />
              )}
            </div>
            <ErrorMessage className={style.errorMessage} name="password" component="div" />
            <div className={style.groupControl}>
              <label htmlFor="password">Repeat password</label>
              <Field className={style.input} type="password" name="rePassword" />
              {!errors.rePassword ? (
                <FontAwesomeIcon
                  style={{ display: `${errors.rePassword ? "none" : "inline-block"}` }}
                  icon={faLock}
                  className={style.icon}
                />
              ) : (
                <FontAwesomeIcon title={errors.rePassword} icon={faExclamation} className={style.errorIcon} />
              )}
            </div>
            <ErrorMessage className={style.errorMessage} name="rePassword" component="div" />
            <CustomButton className={style.button} title="Register" type="submit" />
          </Form>
        )}
      </Formik>
    </Modal>,
    document.body
  );
};

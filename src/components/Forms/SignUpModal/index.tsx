import ReactDOM from "react-dom";
import { useState, useEffect } from "react";
import { Modal, FormMaker } from "../../components";
import { faIdCard, faLock } from "@fortawesome/free-solid-svg-icons";
import { string as yup } from "yup";
import axios from "axios";
import { NavigateFunction } from "react-router";
import { useDispatch } from "react-redux";
import { PASSWORD_LENGTH } from "../../../constants";
import { IFormState } from "@/pages/pages";
import { IFormContent } from "../FormMaker";

interface ISignUpModal {
  isOpen: boolean;
  onClose: Function;
  handlerRegister?: Function;
  navigate: NavigateFunction;
}

export const SignUpModal = ({ handlerRegister, isOpen, onClose, navigate }: ISignUpModal) => {
  const [formState, setFormState] = useState({} as IFormState);
  /* props for making appropriate signup form */
  const form = {
    button: { type: "submit", text: "Register" },
    children: [
      { name: "login", label: "Login", faIcon: faIdCard, type: "text", autofocus: true },
      { name: "password", label: "Password", faIcon: faLock, type: "password" },
      { name: "rePassword", label: "Repeat Password", faIcon: faLock, type: "password" },
    ],
  } as IFormContent;
  /* using redux store dispatch*/
  const dispatch = useDispatch();
  const setUserName = (user = null) => {
    dispatch({ type: "users/login", payload: user });
  };

  const verifyUserData = () => {
    const controller = new AbortController();
    const signal = controller.signal;
    const { login, loginErrorSetter, password, passwordErrorSetter, rePassword, rePasswordErrorSetter } = formState;

    const userData = {
      login: "",
      password: "",
    };
    const loginCheck = yup()
      .trim()
      .required("Enter login")
      .matches(/[A-Z_\-\.a-z0-9]/);
    const passworCheck = yup()
      .trim()
      .required("Enter password")
      .min(PASSWORD_LENGTH, `Password require at least ${PASSWORD_LENGTH} characters`);
    const rePasswordCheck = yup().trim().oneOf([password, null], "Passwords must match");

    const sendDataToServer = (data = userData) => {
      axios
        .put("/api/auth/signUp", data, { signal: signal })
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

    loginCheck
      .validate(login)
      .then((result) => {
        userData.login = result;
        loginErrorSetter("");
      })
      .catch((e) => {
        loginErrorSetter(e.message);
      });
    passworCheck
      .validate(password)
      .then((result) => {
        if (result !== password) {
          setFormState((state) => ({ ...state, password: result }));
        }
        passwordErrorSetter("");
      })
      .catch((e) => {
        passwordErrorSetter(e.message);
      });
    rePasswordCheck
      .validate(rePassword)
      .then((result) => {
        rePasswordErrorSetter("");
        //if valid data send to server data.
        if (result) {
          userData.password = result;
          sendDataToServer(userData);
        }
      })
      .catch((e) => {
        rePasswordErrorSetter(e.message);
      });
    return () => controller.abort();
  };

  useEffect(() => {
    if (!(formState && Object.keys(formState).length === 0 && Object.getPrototypeOf(formState) === Object.prototype)) {
      verifyUserData();
    }
  }, [formState.login, formState.password, form.rePassword]);

  return ReactDOM.createPortal(
    <Modal modalName="Sign Up" isOpen={isOpen} onClose={onClose}>
      <FormMaker formFieldOptions={form} onSubmit={setFormState} />
    </Modal>,
    document.body
  );
};

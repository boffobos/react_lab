import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { FormMaker, Modal } from "../../components";
import { faLock, faIdCard } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { NavigateFunction } from "react-router-dom";
import { useDispatch } from "react-redux";
import { string as yup } from "yup";
import { IFormState } from "@/pages/pages";

interface ISignInModal {
  isOpen: boolean;
  onClose: Function;
  handlerLogin?: Function;
  navigate?: NavigateFunction;
}

export const SignInModal = ({ isOpen, onClose /* navigate */ }: ISignInModal) => {
  const [formState, setFormState] = useState({} as IFormState);
  const form = {
    button: { type: "submit", text: "Login" },
    children: [
      { name: "login", label: "Login", faIcon: faIdCard, type: "text", autofocus: true },
      { name: "password", label: "Password", faIcon: faLock, type: "password" },
    ],
  };
  const verifyUserData = () => {
    const controller = new AbortController();
    const signal = controller.signal;
    const { login, loginErrorSetter, password, passwordErrorSetter } = formState;

    const userData = {
      login: "",
      password: "",
    };
    const loginCheck = yup()
      .trim()
      .required("Enter login")
      .matches(/[A-Z_\-\.a-z0-9]/);
    const passworCheck = yup().trim().required("Enter password");

    const sendDataToServer = (data = userData) => {
      axios
        .post(
          "/api/auth/signIn/",
          {
            login: data.login,
            password: data.password,
          },
          { signal: signal }
        )
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
            loginErrorSetter("Wrong username or password");
          }
        });
    };

    loginCheck
      .validate(login)
      .then((result) => {
        userData.login = result;
        setFormState((state) => ({ ...state, login: result }));
        loginErrorSetter("");
      })
      .catch((e) => {
        loginErrorSetter(e.message);
      });
    passworCheck
      .validate(password)
      .then((result) => {
        if (result) {
          userData.password = result;
          passwordErrorSetter("");
          setFormState((state) => ({ ...state, password: result }));
          if (userData.password && userData.login) {
            sendDataToServer(userData);
          }
        }
      })
      .catch((e) => {
        passwordErrorSetter(e.message);
      });
    return () => controller.abort();
  };

  //using redux store for login
  const dispatch = useDispatch();
  const setUserName = (user: { login: string; id: number; avatar: string }) => {
    dispatch({ type: "users/login", payload: user });
  };

  useEffect(() => {
    if (!(formState && Object.keys(formState).length === 0 && Object.getPrototypeOf(formState) === Object.prototype)) {
      verifyUserData();
    }
  }, [formState.password, formState.login]);

  return ReactDOM.createPortal(
    <Modal modalName="Sign In" isOpen={isOpen} onClose={onClose}>
      <FormMaker formFieldOptions={form} onSubmit={setFormState} />
    </Modal>,
    document.body
  );
};

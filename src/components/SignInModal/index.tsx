import { useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import { FormMaker, Modal } from "../components";
import { faLock, faIdCard } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { NavigateFunction } from "react-router-dom";
import { UserContext } from "@/MainApp";

interface ISignInModal {
  isOpen: boolean;
  onClose: Function;
  handlerLogin: Function;
  navigate?: NavigateFunction;
}

export const SignInModal = ({ handlerLogin, isOpen, onClose /* navigate */ }: ISignInModal) => {
  const form = {
    button: { type: "submit", text: "Login" },
    children: [
      { name: "login", label: "Login", faIcon: faIdCard, type: "text", autofocus: true },
      { name: "password", label: "Password", faIcon: faLock, type: "password" },
    ],
  };

  const [login, setLogin] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  const { userName, setUserName } = useContext(UserContext);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    if (password && login) {
      axios
        .post(
          "/api/auth/signIn/",
          {
            login: login,
            password: password,
          },
          { signal: signal }
        )
        .then((response) => {
          if (response.status === 201) {
            setUserName(login);
            setLogin(null);
            setPassword(null);
            //redirect to requested page???
            onClose();
          } else {
            alert("Authentification failed! Check login and password");
          }
        })
        .catch((e) => {
          if (e.name === "AbortError") {
            console.log("Aborted successfuly!");
          } else {
            console.log("Error during user authentification request");
            console.warn(e);
          }
        });
    } else if (password === "") {
      alert("Enter password");
    } else if (login === "") {
      alert("Enter login");
    } else if (password === "" && login === "") {
      alert("Enter credentials");
    }
    return () => controller.abort();
  });

  const onSubmit = (login: string | null, password: string | null) => {
    setLogin(login);
    setPassword(password);
  };

  return ReactDOM.createPortal(
    <Modal modalName="Sign In" isOpen={isOpen} onClose={onClose}>
      <FormMaker formFieldOptions={form} onSubmit={onSubmit} closeModal={onClose} />
    </Modal>,
    document.body
  );
};

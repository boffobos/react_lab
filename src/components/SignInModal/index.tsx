import { ReactEventHandler, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { FormMaker, IFormMaker, Modal } from "../components";
import { faLock, faIdCard } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

interface ISignInModal extends IFormMaker {
  isOpen: boolean;
  onClose: Function;
  loginHandler: Function;
}

export const SignInModal = ({ loginHandler, isOpen, onClose }: ISignInModal) => {
  const form = {
    button: { type: "submit", text: "Login" },
    children: [
      { name: "login", label: "Login", faIcon: faIdCard, type: "text" },
      { name: "password", label: "Password", faIcon: faLock, type: "password" },
    ],
  };

  const [login, setLogin] = useState(null);
  const [password, setPassword] = useState(null);
  const [authError, setAuthError] = useState({
    emptyLogin: false,
    emptyPassword: false,
    authFail: false,
  });

  useEffect(() => {
    if (password && login) {
      axios
        .post("/api/auth/signIn/", {
          login: login,
          password: password,
        })
        .then((response) => {
          if (response.status === 201) {
            loginHandler(login);
            setLogin(null);
            setPassword(null);
            //redirect to requested page
            onClose();
          } else {
            alert("Authentification failed! Try again");
          }
        })
        .catch((e) => {
          console.log("Error during user authentification request");
          console.warn(e);
        });
    } else if (password === "") {
      alert("Enter password");
    } else if (login === "") {
      alert("Enter login");
    } else if (password === "" && login === "") {
      alert("Enter credentials");
    }
  });

  const onSubmit = (login, password) => {
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

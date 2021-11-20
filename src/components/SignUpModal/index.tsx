import ReactDOM from "react-dom";
import { useState, useEffect } from "react";
import { Modal, FormMaker } from "../components";
import { faIdCard, faLock } from "@fortawesome/free-solid-svg-icons";
import * as yup from "yup";
import axios from "axios";
import { NavigateFunction } from "react-router";

interface ISignUpModal {
  isOpen: boolean;
  onClose: Function;
  handlerRegister: Function;
  navigate: NavigateFunction;
}

export const SignUpModal = ({ handlerRegister, isOpen, onClose, navigate }: ISignUpModal) => {
  const [login, setLogin] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [rePassword, setRePassword] = useState<string | null>(null);
  const form = {
    button: { type: "submit", text: "Register" },
    children: [
      { name: "login", label: "Login", faIcon: faIdCard, type: "text", autofocus: true },
      { name: "password", label: "Password", faIcon: faLock, type: "password" },
      { name: "re-password", label: "Repeat Password", faIcon: faLock, type: "password" },
    ],
  };

  let schema = yup.object().shape({
    login: yup
      .string()
      .required()
      .trim()
      .matches(/[A-Z_\-\.a-z0-9]/),
    password: yup.string().min(6).required("Provide valid password at least 6 characters").trim(),
    rePassword: yup
      .string()
      .trim()
      .oneOf([yup.ref("password"), null], "Password must match"),
  });

  useEffect(() => {
    if (login && password && rePassword) {
      const form = {
        login: login,
        password: password,
        rePassword: rePassword,
      };
      schema
        .validate(form)
        .then((result) => {
          //if valid data send to server data.
          axios
            .put("/api/auth/signUp", result)
            .then((res) => {
              console.log(res.data);
              handlerRegister(res.data);
              navigate("/profile");
              onClose();
            })
            .catch((e) => {
              console.log("error with registration during sending data to server");
              console.log(e);
            });
        })
        .catch((e) => {
          alert(e);
        });
    } else if (password === "" && login === "" && rePassword === "") {
      alert("Enter credentials");
    } else if (login === "") {
      alert("Enter login");
    } else if (password === "") {
      alert("Enter password");
    } else if (rePassword === "") {
      alert("Repeat password");
    }
  }, [login, password, rePassword]);

  const onSubmit = (log: string, pass: string, rePass: string) => {
    setLogin(log);
    setPassword(pass);
    setRePassword(rePass);
  };

  return ReactDOM.createPortal(
    <Modal modalName="Sign Up" isOpen={isOpen} onClose={onClose}>
      <FormMaker formFieldOptions={form} closeModal={onClose} onSubmit={onSubmit} />
    </Modal>,
    document.body
  );
};

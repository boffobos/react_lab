/* Modal forms config */
import { faIdCard, faLock } from "@fortawesome/free-solid-svg-icons";

/*Sign up modal config */
export const signUpFormConfig = {
  button: { type: "submit", text: "Register" },
  onSubmit: function onSubmitf(e: FormDataEvent) {
    //some code
    e.preventDefault();
    alert("Form handler");
  },
  children: [
    { name: "login", label: "Login", faIcon: faIdCard, type: "text" },
    { name: "password", label: "Password", faIcon: faLock, type: "password" },
    { name: "re-password", label: "Repeat Password", faIcon: faLock, type: "password" },
  ],
};

/* Sign in modal config */
export const signInFormConfig = {
  button: { type: "submit", text: "Login" },
  onSubmit: function onSubmitf(e: FormDataEvent) {
    //some code
    e.preventDefault();
    alert("Form handler");
  },
  children: [
    { name: "login", label: "Login", faIcon: faIdCard, type: "text" },
    { name: "password", label: "Password", faIcon: faLock, type: "password" },
  ],
};

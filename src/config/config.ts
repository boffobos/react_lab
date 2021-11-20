/* Modal forms config */
import {
  faRightFromBracket,
  faIdCard,
  faLock,
  faUserAstronaut,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";

/*Sign up modal config */
export const signUpFormConfig = {
  button: { type: "submit", text: "Register" },
  children: [
    { name: "login", label: "Login", faIcon: faIdCard, type: "text", autofocus: true },
    { name: "password", label: "Password", faIcon: faLock, type: "password" },
    { name: "re-password", label: "Repeat Password", faIcon: faLock, type: "password" },
  ],
};

/* Sign in modal config */
export const signInFormConfig = {
  button: { type: "submit", text: "Login" },
  children: [
    { name: "login", label: "Login", faIcon: faIdCard, type: "text", autofocus: true },
    { name: "password", label: "Password", faIcon: faLock, type: "password", autofocus: true },
  ],
};

export const userButtonIcon = faUserAstronaut;
export const cartButtonIcon = faShoppingCart;
export const exitButtonIcon = faRightFromBracket;

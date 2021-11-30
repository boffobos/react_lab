/* Modal forms config */
import { IFormContent } from "@/components/components";
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

/* Change Passpord modal config */

export const changePasswordFormConfig = {
  button: { type: "submit", text: "Submit" },
  children: [
    { name: "password", label: "Current Password", faIcon: faLock, type: "password", autofocus: true },
    { name: "new-password", label: "New Password", faIcon: faLock, type: "password", autofocus: true },
    { name: "re-password", label: "Repeat Password", faIcon: faLock, type: "password", autofocus: true },
  ],
} as IFormContent;

export const userButtonIcon = faUserAstronaut;
export const cartButtonIcon = faShoppingCart;
export const exitButtonIcon = faRightFromBracket;

export const defaultAvatar = "/assets/images/avatars/AV_1.jpg";

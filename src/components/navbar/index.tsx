import {
  exitButtonIcon,
  userButtonIcon,
  cartButtonIcon,
  signInFormConfig,
  signUpFormConfig,
} from "../../config/config";
import { SignInModal, NavlinkButton, NavButton, DropdownMenu, Modal, FormMaker } from "../components";
import { ReactElement, ReactEventHandler, useState } from "react";
import style from "./style.module.css";
import { Option } from "react-dropdown";
// import { SignIn, SignUp } from "../../pages/pages";
import ReactDOM from "react-dom";

interface Options {
  id: number;
  title: string;
  url?: string;
  dropdown?: Option[];
}

interface Props {
  options: Options[];
  userName: string;
  handlerUserNameSet: Function;
  isLoggedIn: string;
  cart: number;
}

export const Navbar = (props: Props): ReactElement => {
  const options = props.options;
  const [signInOpen, setSignInOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);

  const closeSignInModal = () => {
    setSignInOpen(false);
  };

  const openSignInModal = () => {
    setSignInOpen(true);
  };

  const closeSignUpModal = () => {
    setSignUpOpen(false);
  };

  const openSignUpModal = () => {
    setSignUpOpen(true);
  };

  return (
    <>
      <nav className={style.navigation}>
        <ul>
          {options.map((option) => {
            return (
              <li key={option.id}>
                {option.dropdown ? (
                  <DropdownMenu dropdownOptions={option.dropdown} placeholder={option.title} />
                ) : (
                  <NavlinkButton title={option.title} link={option.url} />
                )}
              </li>
            );
          })}
          {!props.isLoggedIn ? (
            <>
              <li>
                <NavButton title="Sign in" handler={openSignInModal} />
              </li>
              <li>
                <NavButton title="Sign up" handler={openSignUpModal} />
              </li>
            </>
          ) : (
            <>
              <li>
                <NavButton
                  title={props.isLoggedIn}
                  handler={() => {
                    alert(`Hey, ${props.isLoggedIn}!`);
                  }}
                  icon={userButtonIcon}
                />
              </li>
              <li>
                <NavButton
                  title={props.cart.toString()}
                  handler={() => {
                    alert("Number of orders!");
                  }}
                  icon={cartButtonIcon}
                />
              </li>
              <li>
                <NavButton
                  title=""
                  handler={() => {
                    props.handlerUserNameSet(null);
                  }}
                  icon={exitButtonIcon}
                />
              </li>
            </>
          )}
        </ul>
      </nav>
      {signInOpen ? (
        <SignInModal
          onClose={closeSignInModal}
          isOpen={signInOpen}
          loginHandler={props.handlerUserNameSet}
          closeModal={closeSignInModal}
        />
      ) : null}
      {signUpOpen ? <SignUpModal /> : null}
    </>
  );
};

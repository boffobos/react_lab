import { exitButtonIcon, userButtonIcon, cartButtonIcon } from "../../config/config";
import { SignInModal, SignUpModal, NavlinkButton, DropdownMenu } from "../components";
import { ReactElement, useState } from "react";
import style from "./style.module.css";
import { Option } from "react-dropdown";
import { useNavigate } from "react-router-dom";
import * as constants from "../../constants";

interface Options {
  id: number;
  title: string;
  url?: string;
  dropdown?: Option[];
}

interface Props {
  options: Options[];
  loggedUserName?: string | null;
  handlerUserNameSet: Function;
  cart: number;
}

export const Navbar = ({ handlerUserNameSet, loggedUserName, options, cart }: Props): ReactElement => {
  const [signInOpen, setSignInOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);
  const navigate = useNavigate();

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
          {!loggedUserName ? (
            <>
              <li>
                <NavlinkButton title="Sign in" handler={openSignInModal} link="sign-in" />
              </li>
              <li>
                <NavlinkButton title="Sign up" handler={openSignUpModal} link="sign-up" />
              </li>
            </>
          ) : (
            <>
              <li>
                <NavlinkButton title={loggedUserName} icon={userButtonIcon} link={constants.PROFILE_URL} />
              </li>
              <li>
                <NavlinkButton
                  title={cart.toString()}
                  handler={() => {
                    alert("Number of orders!");
                  }}
                  icon={cartButtonIcon}
                  link="/cart"
                />
              </li>
              <li>
                <NavlinkButton
                  title=""
                  handler={() => {
                    handlerUserNameSet(null);
                    navigate("/");
                  }}
                  icon={exitButtonIcon}
                  link="logout"
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
          handlerLogin={handlerUserNameSet}
          navigate={navigate}
        />
      ) : signUpOpen ? (
        <SignUpModal
          onClose={closeSignUpModal}
          isOpen={signUpOpen}
          handlerRegister={handlerUserNameSet}
          navigate={navigate}
        />
      ) : null}
    </>
  );
};

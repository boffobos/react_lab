import { exitButtonIcon, userButtonIcon, cartButtonIcon } from "../../config/config";
import { SignInModal, SignUpModal, NavlinkButton, DropdownMenu } from "../components";
import { ReactElement, useState, useContext } from "react";
import style from "./style.module.css";
import { Option } from "react-dropdown";
import { useNavigate } from "react-router-dom";
import * as constants from "../../constants";
import { UserContext } from "@/MainApp";

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
  const context = useContext(UserContext);
  console.log(context);

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
          {!context.userName ? (
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
                <NavlinkButton title={context.userName} icon={userButtonIcon} link={constants.PROFILE_URL} />
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
                    context.setUserName(null);
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
          handlerLogin={context.setUserName}
          navigate={navigate}
        />
      ) : (
        signUpOpen && (
          <SignUpModal
            onClose={closeSignUpModal}
            isOpen={signUpOpen}
            handlerRegister={context.setUserName}
            navigate={navigate}
          />
        )
      )}
    </>
  );
};

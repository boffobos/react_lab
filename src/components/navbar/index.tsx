import { exitButtonIcon, userButtonIcon, cartButtonIcon } from "../../config/config";
import { SignInModal, SignUpModal, NavlinkButton, NavButton, DropdownMenu } from "../components";
import { ReactElement, useState } from "react";
import style from "./style.module.css";
import { Option } from "react-dropdown";
import { useHistory } from "react-router-dom";

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
  const history = useHistory();

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
                  title={loggedUserName}
                  handler={() => {
                    history.push("/profile");
                  }}
                  icon={userButtonIcon}
                />
              </li>
              <li>
                <NavButton
                  title={cart.toString()}
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
                    handlerUserNameSet(null);
                    history.push("/");
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
          handlerLogin={handlerUserNameSet}
          history={history}
        />
      ) : signUpOpen ? (
        <SignUpModal
          onClose={closeSignUpModal}
          isOpen={signUpOpen}
          handlerRegister={handlerUserNameSet}
          history={history}
        />
      ) : null}
    </>
  );
};

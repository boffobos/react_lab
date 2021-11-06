import { DropdownMenu } from "../components";
import { NavLink, Link } from "react-router-dom";
import * as constants from "../../constants";
import style from "./style.module.css";
import { ReactElement } from "react";

interface Props {
  link?: string;
}

export const Header = ({ link }: Props): ReactElement => {
  console.log(style);
  return (
    <header className={style.navbar}>
      <div>
        <Link to={link || "#"} className={style.logo}>
          {constants.SITE_NAME}
        </Link>
      </div>
      <div>
        <nav className={style.navigation}>
          <ul>
            <li>
              <NavLink to="/" exact={true}>
                Home
              </NavLink>
            </li>
            <li>
              <DropdownMenu dropdownOptions={constants.DROPDOWN_OPTIONS} />
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/sign-in">Sign In</NavLink>
            </li>
            <li>
              <NavLink to="/sign-up">Sign Up</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

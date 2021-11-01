import Dropdown from "../dropdown/Dropdown";
import { NavLink, Link } from "react-router-dom";
import css from "./Header.module.css";

interface Props {
  siteName: string;
  link?: string;
}

export default function Header({ siteName, link }: Props): JSX.Element {
  return (
    <header className={css.navbar}>
      <div>
        <Link to={link || "#"} className={css.logo}>
          {siteName}
        </Link>
      </div>
      <div>
        <nav className={css.navigation}>
          <ul>
            <li>
              <NavLink className={css.active} to="/" exact={true}>
                Home
              </NavLink>
            </li>
            <Dropdown className={css.active} text="Products" link="/products" />
            <li>
              <NavLink className={css.active} to="/about">
                About
              </NavLink>
            </li>
            <li>
              <NavLink className={css.active} to="/sign-in">
                Sign In
              </NavLink>
            </li>
            <li>
              <NavLink className={css.active} to="/sign-up">
                Sign Up
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

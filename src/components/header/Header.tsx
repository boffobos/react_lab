import { Dropdown } from "../components";
import { NavLink, Link } from "react-router-dom";
import css from "./Header.module.css";

interface Props {
  siteName: string;
  link?: string;
}

export const Header = ({ siteName, link }: Props): JSX.Element => {
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
              <NavLink to="/" exact={true}>
                Home
              </NavLink>
            </li>
            <Dropdown text="Products" link="/products" />
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
}

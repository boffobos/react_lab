import { NavlinkButton } from "../Navlinkbutton/NavlinkButton";
import { NavLink } from "react-router-dom";
import css from "./Dropdown.module.css";

interface Props {
  className?: string;
  link?: string;
  text: string;
}

export const Dropdown = ({ link = "#", text }: Props): JSX.Element => {
  return (
    <li className={css.navigation}>
      <NavLink to={link}>
        {text} <span>&#11206;</span>
      </NavLink>
      <ul className={css.dropdown}>
        <NavlinkButton text="PC" link="#" className={""} />
        <NavlinkButton text="Console" link="#" className={""} />
        <NavlinkButton text="Mobile" link="#" className={""} />
      </ul>
    </li>
  );
};

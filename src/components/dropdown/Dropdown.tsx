import Navlink from "../navlinkbutton/NavlinkButton";
import { NavLink } from "react-router-dom";
import css from "./Dropdown.module.css";

interface Props {
  className?: string;
  link?: string;
  text: string;
}

export default function Dropdown({ link = "#", text }: Props): JSX.Element {
  return (
    <li className={css.navigation}>
      <NavLink to={link}>
        {text} <span>&#11206;</span>
      </NavLink>
      <ul className={css.dropdown}>
        <Navlink text="PC" link="#" className={""} />
        <Navlink text="Console" link="#" className={""} />
        <Navlink text="Mobile" link="#" className={""} />
      </ul>
    </li>
  );
}

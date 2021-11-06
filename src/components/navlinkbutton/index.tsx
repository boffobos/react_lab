import { ReactElement } from "react";
import style from "./style.module.css";
import { NavLink } from "react-router-dom";

interface Props {
  link: string;
  title: string;
}

export const NavlinkButton = ({ title, link = "#" }: Props): ReactElement => {
  return (
    <NavLink to={link} exact={link === "/"}>
      {title}
    </NavLink>
  );
};

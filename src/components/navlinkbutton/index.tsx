import { ReactElement } from "react";
import { NavLink } from "react-router-dom";

interface Props {
  link: string | undefined;
  title: string;
}

export const NavlinkButton = ({ title, link = "#" }: Props): ReactElement => {
  return (
    <NavLink to={link} exact={link === "/"}>
      {title}
    </NavLink>
  );
};

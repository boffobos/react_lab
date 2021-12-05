import { ReactElement, MouseEventHandler } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface Props {
  title: string;
  link: string | undefined;
  icon?: IconProp;
  handler?: Function;
}

export const NavlinkButton = ({ title, link = "#", icon, handler }: Props): ReactElement => {
  const mouseEvent: MouseEventHandler = (e) => {
    e.preventDefault();
    if (handler) handler();
  };
  return (
    <NavLink to={link} onClick={handler ? mouseEvent : undefined}>
      {icon ? (
        <span>
          <FontAwesomeIcon icon={icon} />{" "}
        </span>
      ) : null}
      {title}
    </NavLink>
  );
};

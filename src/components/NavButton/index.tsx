import { MouseEventHandler } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Link } from "react-router-dom";

interface INavButton {
  title: string;
  handler: MouseEventHandler;
  icon?: IconProp;
}

export const NavButton = ({ title, handler, icon }: INavButton) => {
  return (
    <button onClick={handler}>
      {icon ? (
        <span>
          <FontAwesomeIcon icon={icon} />{" "}
        </span>
      ) : null}
      {title}
    </button>
  );
};

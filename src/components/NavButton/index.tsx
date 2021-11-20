import { MouseEventHandler } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Link } from "react-router-dom";
import * as constants from "../../constants";

interface INavButton {
  title: string;
  handler: MouseEventHandler;
  icon?: IconProp;
}

export const NavButton = ({ title, handler, icon }: INavButton) => {
  return (
    <Link to={constants.PROFILE_URL}>
      <button onClick={handler}>
        {icon ? (
          <span>
            <FontAwesomeIcon icon={icon} />{" "}
          </span>
        ) : null}
        {title}
      </button>
    </Link>
  );
};

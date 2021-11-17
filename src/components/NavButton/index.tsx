import { IconDefinition } from "@fortawesome/free-regular-svg-icons";
import { MouseEventHandler } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface INavButton {
  title: string;
  handler: MouseEventHandler;
  icon?: IconDefinition;
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

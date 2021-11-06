import { ReactElement } from "react";
import style from "./style.module.css";

interface Props {
  className?: string;
  link?: string;
  text: string;
}

export const NavlinkButton = ({ text, link = "#" }: Props): ReactElement => {
  return (
    <li className={style.active}>
      <a href={link}>{text}</a>
    </li>
  );
};

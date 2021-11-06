import { Navbar } from "../components";
import { Link } from "react-router-dom";
import * as constants from "../../constants";
import style from "./style.module.css";
import { ReactElement } from "react";

interface Props {
  link?: string;
  siteName: string;
}

export const Header = ({ link = "#" }: Props): ReactElement => {
  return (
    <header className={style.header}>
      <div>
        <Link to={link} className={style.logo}>
          {constants.SITE_NAME}
        </Link>
      </div>
      <div>
        <Navbar options={constants.NAVBAR_OPTIONS} />
      </div>
    </header>
  );
};

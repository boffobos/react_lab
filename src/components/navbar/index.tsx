import { DropdownMenu } from "../components";
import { NavlinkButton } from "../components";
import * as constants from "../../constants";
import { ReactElement } from "react";
import style from "./style.module.css";

export const Navbar = (): ReactElement => {
  return (
    <nav className="navigation">
      <ul>
        <NavlinkButton text="Home" link="#" />
        <DropdownMenu dropdownOptions={constants.DROPDOWN_OPTIONS} />
        <NavlinkButton text="About" />
        <NavlinkButton text="Sign In" />
        <NavlinkButton text="Sign Up" />
      </ul>
    </nav>
  );
};

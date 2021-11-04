import { DropdownMenu } from "../components";
import { NavlinkButton } from "../components";
import * as constants from "../../constants";

export const Navbar = (): JSX.Element => {
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

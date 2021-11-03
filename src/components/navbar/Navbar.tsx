import { Dropdown } from "../components";
import { NavlinkButton } from "../components";

export const Navbar = (): JSX.Element => {
  return (
    <nav className="navigation">
      <ul>
        <NavlinkButton text="Home" link="#" />
        <Dropdown text="Products" />
        <NavlinkButton text="About" />
        <NavlinkButton text="Sign In" />
        <NavlinkButton text="Sign Up" />
      </ul>
    </nav>
  );
};

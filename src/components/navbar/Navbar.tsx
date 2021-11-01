import Dropdown from "../dropdown/Dropdown";
import Navlink from "../navlinkbutton/NavlinkButton";

export default function Navbar(): JSX.Element {
  return (
    <nav className="navigation">
      <ul>
        <Navlink text="Home" link="#" />
        <Dropdown text="Products" />
        <Navlink text="About" />
        <Navlink text="Sign In" />
        <Navlink text="Sign Up" />
      </ul>
    </nav>
  );
}

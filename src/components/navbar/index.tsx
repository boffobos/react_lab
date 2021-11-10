import { DropdownMenu } from "../components";
import { NavlinkButton } from "../components";
import { ReactElement } from "react";
import style from "./style.module.css";
import { Option } from "react-dropdown";

interface Options {
  id: number;
  title: string;
  url: string;
  dropdown?: Option[];
}

interface Props {
  options: Options[];
}

export const Navbar = (props: Props): ReactElement => {
  const options = props.options;
  return (
    <nav className={style.navigation}>
      <ul>
        {options.map((option) => {
          return (
            <li key={option.id}>
              {option.dropdown ? (
                <DropdownMenu dropdownOptions={option.dropdown} placeholder={option.title} />
              ) : (
                <NavlinkButton title={option.title} link={option.url} />
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

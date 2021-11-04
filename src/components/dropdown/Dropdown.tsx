import css from "./Dropdown.module.css";
import Dropdown, { Option } from "react-dropdown";

interface Props {
  dropdownOptions: Option[];
}

export const DropdownMenu = (props: Props): JSX.Element => {
  const handler = () => {
    //some code to handle menu
  };

  return (
    <Dropdown
      options={props.dropdownOptions}
      arrowClosed={<span className="arrow-closed">&#11206;</span>}
      arrowOpen={<span className="arrow-open">&#11205;</span>}
      placeholder="Products"
      className={css.DropdownRoot}
      controlClassName={css.dropdownControl}
      menuClassName={css.menu}
      onChange={handler}
    />
  );
};

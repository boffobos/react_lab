import style from "./style.module.css";
import Dropdown, { Option } from "react-dropdown";
import { Redirect } from "react-router-dom";
import { ReactElement } from "react";

interface Props {
  dropdownOptions: Option[];
}

export const DropdownMenu = (props: Props): ReactElement => {
  const handler = () => {
    <Redirect to="/" />;
    //some code to handle menu
  };

  return (
    <Dropdown
      options={props.dropdownOptions}
      arrowClosed={<span className="arrow-closed">&#11206;</span>}
      arrowOpen={<span className="arrow-open">&#11205;</span>}
      placeholder="Products"
      className={style.DropdownRoot}
      controlClassName={style.dropdownControl}
      menuClassName={style.menu}
      onChange={handler}
    />
  );
};

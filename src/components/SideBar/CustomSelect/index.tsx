import style from "./style.module.css";
import Dropdown, { Option } from "react-dropdown";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  options: Option[];
  label: string;
  selected: Function;
  placeholder: string;
}

export const CustomSelect = ({ options, label, selected, placeholder }: Props) => {
  const onChange = (e) => {
    selected(e);
  };
  return (
    <>
      <div>{label}</div>

      <Dropdown
        options={options}
        placeholder={placeholder}
        onChange={onChange}
        className={style.root}
        menuClassName={style.menu}
        controlClassName={style.control}
        arrowClassName={style.arrow}
        arrowOpen={<FontAwesomeIcon icon={faChevronUp} />}
        arrowClosed={<FontAwesomeIcon icon={faChevronDown} />}
      />
    </>
  );
};

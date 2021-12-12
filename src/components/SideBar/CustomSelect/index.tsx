import style from "./style.module.css";
import Dropdown, { Option } from "react-dropdown";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface Props {
  options: Option[];
  label: string;
  selected: Function;
  placeholder: string;
  value: string;
}

export const CustomSelect = ({ options, label, selected, placeholder, value }: Props) => {
  const onChange = (e: Option) => {
    selected(e);
  };
  return (
    <>
      <div>{label}</div>

      <Dropdown
        options={options}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={style.root}
        menuClassName={style.menu}
        controlClassName={style.control}
        arrowClassName={style.arrow}
        arrowOpen={<FontAwesomeIcon icon={faChevronUp as IconProp} />}
        arrowClosed={<FontAwesomeIcon icon={faChevronDown as IconProp} />}
      />
    </>
  );
};

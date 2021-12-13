import style from "./style.module.css";
import Dropdown, { Option } from "react-dropdown";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface Props {
  options: Option[];
  placeholder?: string;
}

export const CustomSingleSelect = ({ options, placeholder }: Props) => {
  return (
    <Dropdown
      options={options}
      placeholder={placeholder}
      className={style.root}
      menuClassName={style.menu}
      controlClassName={style.control}
      arrowClassName={style.arrow}
      arrowOpen={<FontAwesomeIcon icon={faChevronUp as IconProp} />}
      arrowClosed={<FontAwesomeIcon icon={faChevronDown as IconProp} />}
    />
  );
};

import { ReactElement } from "react";
import style from "./style.module.css";
interface Props {
  searchPlaceholder: string;
}

export const SearchBar = (props: Props): ReactElement => {
  return (
      <input type="text" placeholder={props.searchPlaceholder} className={style.searchBar} />
  );
};

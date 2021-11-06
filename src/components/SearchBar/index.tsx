import { ReactElement } from "react";
import style from "./style.module.css";
interface Props {
  searchPlaceholder: string;
}

export const SearchBar = (props: Props): ReactElement => {
  return (
    <div>
      <input type="text" placeholder={props.searchPlaceholder} className={style.searchBar} />
    </div>
  );
};

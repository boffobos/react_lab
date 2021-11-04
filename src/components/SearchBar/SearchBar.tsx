import css from "./SearchBar.module.css";
interface Props {
  searchPlaceholder: string;
}

export const SearchBar = (props: Props) => {
  return (
    <div>
      <input type="text" placeholder={props.searchPlaceholder} className={css.searchBar} />
    </div>
  );
};

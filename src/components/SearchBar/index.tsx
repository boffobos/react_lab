import { ReactElement } from "react";
import style from "./style.module.css";
import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import axios from "axios";
import { SearchCard } from "../components";

interface Props {
  searchPlaceholder: string;
}

export const SearchBar = (props: Props): ReactElement => {
  const [search, setSearch] = useState("");
  const [debousedSearch] = useDebounce(search, 1000);
  const [found, setFound] = useState(false);
  const [results, setResults] = useState([]);
  useEffect(() => {
    setResults([]);
    if (debousedSearch) {
      axios
        .get("/api/search/" + debousedSearch)
        .then((response) => {
          console.log(response.data);
          setResults(results.concat(response.data));
          setFound(true);
        })
        .then(() => {
          console.log(results);
        });
    }
  }, [debousedSearch]);

  const inputHandler = (event) => {
    setSearch(event.target.value);
    console.log(search);
  };
  return (
    <>
      <input
        type="text"
        placeholder={props.searchPlaceholder}
        className={style.searchBar}
        onChange={(e) => setSearch(e.target.value)}
      />
      {results.length ? (
        <div className={style.results}>
          {results.map((line) => (
            <SearchCard key={line.id} data={line} />
          ))}
        </div>
      ) : null}
    </>
  );
};

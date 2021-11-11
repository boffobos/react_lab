import { ReactElement } from "react";
import style from "./style.module.css";
import { useState, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import axios from "axios";
import { SearchCard, IGameData } from "../components";

interface Props {
  searchPlaceholder: string;
}

export const SearchBar = (props: Props): ReactElement => {
  const [search, setSearch] = useState("");
  const debounsedSearch = useDebouncedCallback((value) => {
    setSearch(value);
  }, 300);
  const [results, setResults] = useState<IGameData[]>([]);

  useEffect(() => {
    // setResults([]);
    if (search.trim()) {
      axios.get("/api/search/" + search.trim()).then((response) => {
        // console.log(response.data);
        if (Array.isArray(response.data) && response.data) {
          setResults(response.data);
        }
      });
    } else {
      setResults([]);
    }
  }, [search]);

  const handler = () => {
    alert("got it");
  };

  return (
    <div className={style.container}>
      <input
        type="text"
        placeholder={props.searchPlaceholder}
        className={style.searchBar}
        onChange={(e) => debounsedSearch(e.target.value)}
      />
      {results.length ? (
        <div className={style.results}>
          {results.map((line) => (
            <SearchCard onClick={handler} key={line.id} data={line} />
          ))}
        </div>
      ) : null}
    </div>
  );
};

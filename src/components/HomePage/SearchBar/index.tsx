import { ChangeEvent, ChangeEventHandler, ReactElement } from "react";
import style from "./style.module.css";
import { useState, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import axios from "axios";
import { SearchCard, IGameData } from "../../components";

interface Props {
  searchPlaceholder: string;
  value?: string;
  onChange?: ChangeEventHandler;
  className?: string;
}

export const SearchBar = (props: Props): ReactElement => {
  const [search, setSearch] = useState("");
  const [input, setInput] = useState("");
  const debounsedSearch = useDebouncedCallback((value) => {
    setSearch(value);
  }, 300);

  if (!props.onChange) {
    debounsedSearch(input);
  }

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (props.onChange) {
      props.onChange(e);
    } else setInput(e.target.value);
  };

  //sequest to server for games
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

  const onClickCardhandler = () => {
    alert("got it");
  };

  return (
    <div className={style.container}>
      <input
        type="text"
        className={`${style.searchBar} ${props.className} `}
        placeholder={props.searchPlaceholder}
        onChange={handleInput}
        value={props.value || input}
      />
      {results.length ? (
        <div className={style.results}>
          {results.map((line) => (
            <SearchCard onClick={onClickCardhandler} key={line.id} data={line} />
          ))}
        </div>
      ) : null}
    </div>
  );
};

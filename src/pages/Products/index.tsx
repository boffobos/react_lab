import style from "./style.module.css";
import {
  Section,
  SearchBar,
  SideBar,
  SideBarSection,
  CustomSelect,
  CustomRadioButtons,
  IGameData,
  CustomButton,
} from "../../components/components";
import { ageOptions, genresOptions, sortTypeOptions, sortCriteriaOptions } from "../../config/config";
import { useParams } from "react-router-dom";
import { useState, useEffect, ChangeEvent } from "react";
import { useDebouncedCallback } from "use-debounce";
import axios from "axios";
import { Option } from "react-dropdown";
import { useGameCard } from "@/hooks/useGameCard";
import { getPlatformFromSelector } from "../../helpers/functions";
import { useSelector } from "react-redux";

export const Products = () => {
  const params = useParams();
  //const [isLoading, setIsLoading] = useState(true); //change initial state when finish
  const [loadedGames, setLoadedGames] = useState<IGameData | null>();
  const [sortCriteria, setSortCriteria] = useState("name");
  const [sortType, setSortType] = useState("asc");
  const [genreType, setGenreType] = useState("all");
  const [ageRating, setAgeRating] = useState(0);
  const [input, setInput] = useState("");
  const [searchName, setSearchName] = useState("");
  const userRole = useSelector((state) => state.users.role);
  console.log(userRole);

  // Sidebar handling functions
  const hanleSortCriteria = (e: Option) => {
    if (e) setSortCriteria(e.value);
  };

  const handleCriteriaType = (e: Option) => {
    if (e) setSortType(e.value);
  };

  const handleGenreChanges = (e: ChangeEvent<HTMLInputElement>) => {
    setGenreType(e.target.value);
  };

  const handleAgeChanges = (e: ChangeEvent<HTMLInputElement>) => {
    setAgeRating(+e.target.value);
  };

  //Search handling
  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  //debounced search
  const setSearch = useDebouncedCallback((input) => {
    setSearchName(input);
  }, 300);

  setSearch(input);

  //function for sorting games on page
  const sortOrder = (array: Array<IGameData>) => {
    switch (sortType) {
      case "asc": {
        switch (sortCriteria) {
          case "name": {
            array.sort((first, second) => {
              if (first.title > second.title) return 1;
              if (first.title < second.title) return -1;
              if (first.title == second.title) return 0;
            });
            break;
          }
          case "age": {
            array.sort((first, second) => {
              if (first.ageRating > second.ageRating) return 1;
              if (first.ageRating < second.ageRating) return -1;
              if (first.ageRating == second.ageRating) return 0;
            });
            break;
          }
          case "price": {
            array.sort((first, second) => {
              if (first.price > second.price) return 1;
              if (first.price < second.price) return -1;
              if (first.price == second.price) return 0;
            });
            break;
          }
          case "rating": {
            array.sort((first, second) => {
              if (first.rating > second.rating) return 1;
              if (first.rating < second.rating) return -1;
              if (first.rating == second.rating) return 0;
            });
            break;
          }
        }
        break;
      }
      case "desc":
        {
          switch (sortCriteria) {
            case "name": {
              array.sort((first, second) => {
                if (first.title > second.title) return -1;
                if (first.title < second.title) return 1;
                if (first.title == second.title) return 0;
              });
              break;
            }
            case "age": {
              array.sort((first, second) => {
                if (first.ageRating > second.ageRating) return -1;
                if (first.ageRating < second.ageRating) return 1;
                if (first.ageRating == second.ageRating) return 0;
              });
              break;
            }
            case "price": {
              array.sort((first, second) => {
                if (first.price > second.price) return -1;
                if (first.price < second.price) return 1;
                if (first.price == second.price) return 0;
              });
              break;
            }
            case "rating": {
              array.sort((first, second) => {
                if (first.rating > second.rating) return -1;
                if (first.rating < second.rating) return 1;
                if (first.rating == second.rating) return 0;
              });
              break;
            }
          }
        }
        break;
    }
  };

  useEffect(() => {
    if (loadedGames) {
      const arr = [...loadedGames];
      sortOrder(arr);
      setLoadedGames(arr);
    }
  }, [sortCriteria, sortType]);

  const platformTitle = params.platform;
  const setTitle = () => getPlatformFromSelector(platformTitle);

  useEffect(() => {
    setLoadedGames(null);
    axios.get(`/api/products/${platformTitle}/${genreType}/${ageRating}/${searchName || "$all"}`).then((result) => {
      let games = result.data;
      sortOrder(games);
      setLoadedGames(games);
      //setIsLoading(false);
    });
  }, [platformTitle, ageRating, genreType, searchName]);

  return (
    <div
      className={style.container}
      style={{
        background: `url(/assets/images/bg_3.jpg) no-repeat center center/cover`,
      }}
    >
      <SideBar title={setTitle()}>
        <SideBarSection title="Sort">
          <div className={style.selection}>
            <CustomSelect
              label="Criteria"
              options={sortCriteriaOptions}
              selected={hanleSortCriteria}
              placeholder="Name"
              value={sortCriteria}
            />
          </div>
          <div className={style.selection}>
            <CustomSelect
              label="Type"
              options={sortTypeOptions}
              selected={handleCriteriaType}
              placeholder="Ascending"
              value={sortType}
            />
          </div>
        </SideBarSection>
        <SideBarSection title="Genres">
          <CustomRadioButtons
            groupName="genres"
            options={genresOptions}
            value={genreType}
            onChange={handleGenreChanges}
          />
        </SideBarSection>
        <SideBarSection title="Age rating">
          <CustomRadioButtons
            groupName="age"
            /*   */
            options={ageOptions}
            value={ageRating}
            onChange={handleAgeChanges}
          />
        </SideBarSection>
      </SideBar>
      <main>
        <SearchBar className={style.searchBar} searchPlaceholder="Search" onChange={handleSearchInput} value={input} />
        {userRole === "admin" ? (
          <CustomButton className={style.createBtn} title="Create card" onClick={() => alert("Creating game card..")} />
        ) : null}
        <Section title={setTitle()}>{useGameCard(loadedGames, platformTitle)}</Section>
      </main>
    </div>
  );
};

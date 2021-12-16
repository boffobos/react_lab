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
  GameCardForm,
} from "../../components/components";
import { ageOptions, genresOptions, sortTypeOptions, sortCriteriaOptions } from "../../config/config";
import { useParams } from "react-router-dom";
import { useState, useEffect, ChangeEvent } from "react";
import { useDebouncedCallback } from "use-debounce";
import axios from "axios";
import { Option } from "react-dropdown";
import { useGameCard } from "@/hooks/useGameCard";
import { getPlatformFromSelector } from "../../helpers/functions";
import { useDispatch, useSelector } from "react-redux";

export const Products = () => {
  const params = useParams();
  const dispatch = useDispatch();
  //const [isLoading, setIsLoading] = useState(true); //change initial state when finish
  const [loadedGames, setLoadedGames] = useState<IGameData[] | null>(null);
  const [sortCriteria, setSortCriteria] = useState("name");
  const [sortType, setSortType] = useState("asc");
  const [genreType, setGenreType] = useState("all");
  const [ageRating, setAgeRating] = useState(0);
  const [input, setInput] = useState("");
  const [searchName, setSearchName] = useState("");
  const userRole = useSelector((state) => state.users.role);
  const gamesInStore = useSelector((state) => state.games);

  const platformTitle = params.platform;

  //const platformTitle = params.platform;
  const setTitle = () => getPlatformFromSelector(platformTitle);

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

  const filterGames = (array: Array<IGameData> | undefined) => {
    let filtered = [...(array || gamesInStore)];
    if (searchName === "") {
      //skip filtering
    } else if (searchName) {
      filtered = filtered.filter((game) => game.title.toLowerCase().includes(searchName.toLowerCase()));
    }
    if (platformTitle === "" || undefined) {
      //skip filtering
    } else {
      filtered = filtered.filter((game) => game.platformsSelector.includes(platformTitle));
    }
    if (genreType === "all") {
      //skip filtering
    } else if (genreType) {
      filtered = filtered.filter((game) => game.genre.includes(genreType));
    }
    if (+ageRating) {
      filtered = filtered.filter((game) => game.ageRating <= +ageRating);
    }
    return filtered;
  };

  useEffect(() => {
    if (loadedGames) {
      const arr = [...loadedGames];
      sortOrder(arr);
      setLoadedGames(filterGames(arr));
    }
  }, [sortCriteria, sortType]);

  //get all games from server and place them into redux on first load
  useEffect(() => {
    axios.get(`/api/products/$all/all/0/$all`).then((result) => {
      let games = result.data;
      dispatch({ type: "games/added", payload: games });
      sortOrder(games);
      setLoadedGames(filterGames(games));
    });
  }, []);

  //changes order of cards when set sort parameters
  useEffect(() => {
    if (loadedGames) {
      let games = [...gamesInStore];
      sortOrder(games);
      setLoadedGames(filterGames(games));
    }
  }, [platformTitle, ageRating, genreType, searchName, gamesInStore]);

  return (
    <>
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
          <SearchBar
            className={style.searchBar}
            searchPlaceholder="Search"
            onChange={handleSearchInput}
            value={input}
          />
          {userRole === "admin" ? (
            <CustomButton
              className={style.createBtn}
              title="Create card"
              onClick={() => alert("Creating game card..")}
            />
          ) : null}
          <Section title={setTitle()}>{useGameCard(loadedGames, platformTitle)}</Section>
        </main>
      </div>
      {/* Create new card modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal} modalName="Edit Card" className={style.modal}>
        <GameCardForm onSubmit={createNewCard}/>
      </Modal>
    </>
  );
};

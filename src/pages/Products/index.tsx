import style from "./style.module.css";
import {
  Section,
  Spinner,
  SearchBar,
  GameCard,
  SideBar,
  SideBarSection,
  CustomSelect,
  CustomRadioButtons,
  IGameData,
} from "../../components/components";
import { useParams } from "react-router-dom";
import { useState, useEffect, ChangeEvent } from "react";
import { useDebouncedCallback } from "use-debounce";
import axios from "axios";

export const Products = () => {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true); //change initial state when finish
  const [loadedGames, setLoadedGames] = useState<IGameData>();
  const [sortCriteria, setSortCriteria] = useState("name");
  const [sortType, setSortType] = useState("asc");
  const [genreType, setGenreType] = useState("all");
  const [ageRating, setAgeRating] = useState(0);
  const [input, setInput] = useState("");
  const [searchName, setSearchName] = useState("");

  //Dropdown options
  const sortCriteriaOptions = [
    {
      label: "Name",
      value: "name",
    },
    {
      label: "Age",
      value: "age",
    },
    {
      label: "Rating",
      value: "rating",
    },
    {
      label: "Price",
      value: "price",
    },
  ];
  const hanleSortCriteria = (e) => {
    if (e) setSortCriteria(e.value);
  };

  const sortTypeOptions = [
    {
      label: "Ascending",
      value: "asc",
    },
    {
      label: "Descending",
      value: "desc",
    },
  ];
  const handleCriteriaType = (e) => {
    if (e) setSortType(e.value);
  };

  //Radio buttons options
  const genresOptions = [
    {
      label: "All genres",
      value: "all",
      selected: true,
    },
    {
      label: "Actions",
      value: "action",
    },
    {
      label: "RPG",
      value: "rpg",
    },
    {
      label: "RTS",
      value: "rts",
    },
    {
      label: "Arcade",
      value: "arcade",
    },
  ];
  const handleGenreChanges = (e: ChangeEvent<HTMLInputElement>) => {
    setGenreType(e.target.value);
  };

  const ageOptions = [
    {
      label: "All ages",
      value: 0,
    },
    {
      label: "3+",
      value: 3,
    },
    {
      label: "6+",
      value: 6,
    },
    {
      label: "12+",
      value: 12,
    },
    {
      label: "18+",
      value: 18,
    },
  ];
  const handleAgeChanges = (e: ChangeEvent<HTMLInputElement>) => {
    setAgeRating(+e.target.value);
  };

  //Search handling
  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target);
    setInput(e.target.value);
  };
  //debounced search
  const setSearch = useDebouncedCallback((input) => {
    setSearchName(input);
  }, 300);

  setSearch(input);

  //function for sorting games on page
  const sortOrder = (array) => {
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
  const setTitle = () => {
    switch (platformTitle) {
      case "pc": {
        return "PC";
      }
      case "xboxOne": {
        return "XBox One";
      }
      case "playstation5": {
        return "Playstation 5";
      }
      default:
        return "Products";
    }
  };

  useEffect(() => {
    axios.get(`/api/products/${platformTitle}/${genreType}/${ageRating}/${searchName || "$all"}`).then((result) => {
      let games = result.data;
      sortOrder(games);
      setLoadedGames(games);
      setIsLoading(false);
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
        <SearchBar searchPlaceholder="Search" onChange={handleSearchInput} value={input} />
        <Section title={setTitle()}>
          {isLoading ? <Spinner /> : loadedGames.map((game) => <GameCard key={game.id} data={game} />)}
        </Section>
      </main>
    </div>
  );
};

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
} from "../../components/components";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export const Products = () => {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true); //change initial state when finish
  const [loadedGames, setLoadedGames] = useState([]);
  const [sortCriteria, setSortCriteria] = useState("name");
  const [sortType, setSortType] = useState("asc");
  const [genreType, setGenreType] = useState("all");

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
  const genresOption = [
    {
      label: "All genres",
      value: "all",
      selected: true,
    },
    {
      label: "Actions",
      value: "actions",
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

  const handleGenreChanges = (e) => {
    console.log(e);
    setGenreType(e.target.value);
  };

  //temp params for get request
  //const sortType = "name";
  const genre = "action";
  const age = "18";
  const searchName = "all";
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
    axios.get(`/api/products/${platformTitle}/${genre}/${age}/${searchName}`).then((result) => {
      setLoadedGames(result.data);
      setIsLoading(false);
    });
  }, [platformTitle]);

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
            />
          </div>
          <div className={style.selection}>
            <CustomSelect
              label="Type"
              options={sortTypeOptions}
              selected={handleCriteriaType}
              placeholder="Ascending"
            />
          </div>
        </SideBarSection>
        <SideBarSection title="Genres">
          <CustomRadioButtons groupName="genres" options={genresOption} onChange={handleGenreChanges} />
        </SideBarSection>
      </SideBar>
      <main>
        <SearchBar searchPlaceholder="Search" />
        <Section title={setTitle()}>
          {isLoading ? <Spinner /> : loadedGames.map((game) => <GameCard key={game.id} data={game} />)}
        </Section>
      </main>
    </div>
  );
};

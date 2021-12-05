import style from "./style.module.css";
import { Section, Spinner, SideBar, SearchBar, GameCard } from "../../components/components";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export const Products = () => {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true); //change initial state when finish
  const [loadedGames, setLoadedGames] = useState([]);

  //temp params for get request
  const sortType = "name";
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
    axios.get(`/api/products/${platformTitle}/${sortType}/${genre}/${age}/${searchName}`).then((result) => {
      console.log(result.data);
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
      <SideBar title={setTitle()}>Hello PC</SideBar>
      <main>
        <SearchBar searchPlaceholder="Search" />
        <Section title={setTitle()}>
          {isLoading ? <Spinner /> : loadedGames.map((game) => <GameCard data={game} />)}
        </Section>
      </main>
    </div>
  );
};

import { SearchBar, Section, PlatformSelector, GameCard, Spinner, IGameData } from "../../components/components";
import style from "./style.module.css";
import * as constants from "../../constants";
import { useEffect, useState } from "react";
import axios from "axios";

export const Home = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState<IGameData[]>([]);

  const cartHandler = () => {
    alert("Added to cart");
  };

  useEffect(() => {
    axios
      .get<IGameData[]>("/api/getTopProducts")
      .then((response) => {
        setItems(items.concat(response.data));
        setIsLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setIsLoading(false);
      });
  }, []);

  return (
    <main
      className={style.homePage}
      style={{
        background: `url(/assets/images/bg.jpg) no-repeat center center/cover`,
      }}
    >
      <SearchBar searchPlaceholder="Search..." />
      <Section title="Categories">
        {constants.GAME_PLATFORMS.map((item) => {
          return (
            <PlatformSelector
              key={item.id}
              imgAlt={item.alt}
              imgURL={item.icon}
              categoryTitle={item.title}
              categoryURL={item.url}
            />
          );
        })}
      </Section>
      <Section title="New games">
        {isLoading ? (
          <Spinner />
        ) : (
          items.map((item) => {
            return <GameCard key={item.id} data={item} handler={cartHandler} />;
          })
        )}
      </Section>
    </main>
  );
};

import { SearchBar, Section, PlatformSelector, GameCard, Spinner, IGameData } from "../../components/components";
import style from "./style.module.css";
import { GAME_PLATFORMS } from "../../constants";
import { useEffect, useState } from "react";
import axios from "axios";

export const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState<IGameData[]>([]);

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
        {GAME_PLATFORMS.map((item) => {
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
        <div className={style.gameCards}>
          {isLoading ? (
            <Spinner />
          ) : (
            items.map((item) => {
              return <GameCard key={item.id} data={item} />;
            })
          )}
        </div>
      </Section>
    </main>
  );
};

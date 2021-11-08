import { SearchBar, Section, PlatformSelector, GameCard } from "../../components/components";
import style from "./style.module.css";
import * as constants from "../../constants";
import { useEffect } from "react";

export const Home = () => {

  useEffect(() => {
    
  }, [])
  return (
    <main
      className={style.homePage}
      style={{
        background: `url(/assets/images/bg.jpg) no-repeat center center/cover`,
      }}
    >
      <SearchBar searchPlaceholder="Search..." />
      <Section title="Categoies">
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
        <GameCard />
      </Section>
    </main>
  );
};

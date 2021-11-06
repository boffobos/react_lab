import { SearchBar, Section, PlatformSelector } from "../../components/components";
import style from "./style.module.css";
import * as constants from "../../constants";

export const Home = () => {
  return (
    <main
      className={style.homePage}
      style={{
        background: `url(/assets/images/bg.jpg) no-repeat center center/cover`,
      }}
    >
      <SearchBar searchPlaceholder="Search..." />
      <Section title="Platforms">
        {constants.GAME_PLATFORMS.map((item) => {
          return <PlatformSelector key={item.id} imgAlt={item.alt} imgURL={item.icon} categoryTitle={item.title} />;
        })}
      </Section>
    </main>
  );
};

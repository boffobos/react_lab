import { SearchBar, Section, PlatformSelector } from "../../components/components";
import style from "./style.module.css";
export const Home = () => {
  const gamePlatforms = [
    { title: "PC", img: "/assets/images/pc.png", alt: "PC" },
    { title: "XBox One", img: "/assets/images/xbox.png", alt: "XBox One" },
    { title: "Playstation 5", img: "/assets/images/playstation.png", alt: "Playstation 5" },
  ];
  return (
    <main
      className={style.homePage}
      style={{
        background: `url(/assets/images/bg.jpg) no-repeat center center/cover`,
      }}
    >
      <SearchBar searchPlaceholder="Search..." />
      <Section title="Platforms">
        {gamePlatforms.map((item) => {
          return <PlatformSelector imgAlt={item.alt} imgURL={item.img} categoryTitle={item.title} />;
        })}
      </Section>
    </main>
  );
};

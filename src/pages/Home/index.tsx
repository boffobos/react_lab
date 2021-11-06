import { SearchBar, Section } from "../../components/components";
import style from "./style.module.css";
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
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo, assumenda?</p>
      </Section>
    </main>
  );
};

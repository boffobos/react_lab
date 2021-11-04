import { SearchBar } from "@/components/SearchBar/SearchBar";
import css from "./Home.module.css";
export const Home = () => {
  return (
    <main
      className={css.homePage}
      style={{
        background: `url(/assets/images/bg.jpg) no-repeat center center/cover`,
      }}
    >
      <SearchBar searchPlaceholder="Search..." />
    </main>
  );
};

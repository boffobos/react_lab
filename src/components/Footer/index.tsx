import { ReactElement } from "react";
import style from "./style.module.css";

interface Props {
  siteName: string;
}

export const Footer = ({ siteName }: Props): ReactElement => {
  return (
    <footer>
      <div className={style.container}>
        <div>
          <p>&copy; 2021 {siteName}. Incredible convenient</p>
        </div>
        <div className={style.companies}>
          <div>
            <a href="https://worldoftanks.com/" target="_blank">
              <img src="./assets/images/World_of_Tanks.png" alt="logo" />
            </a>
          </div>
          <div>
            <a href="https://www.sega.com/" target="_blank">
              <img src="./assets/images/Sega_logo.png" alt="logo" />
            </a>
          </div>
          <div>
            <a href="https://www.blizzard.com/" target="_blank">
              <img src="./assets/images/blizzard.png" alt="logo" />
            </a>
          </div>
          <div>
            <a href="https://www.ea.com/" target="_blank">
              <img src="./assets/images/eagames.png" alt="logo" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

import { MouseEventHandler, ReactElement } from "react";
import style from "./style.module.css";
import { GameData } from "../GameCard/index";

interface Props {
  data: GameData;
  onClick: MouseEventHandler;
}

export const SearchCard = ({ data, onClick }: Props): ReactElement => {
  const line = data;

  return (
    <div className={style.container} onClick={onClick}>
      <div className={style.image}>
        <img src={line.image} alt={line.title} />
      </div>
      <div className={style.title}>{line.title}</div>
      <div className={style.price}>
        {line.price}
        <span>{line.currency}</span>
      </div>
    </div>
  );
};

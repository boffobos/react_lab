import { ReactElement } from "react";
import style from "./style.module.css";
import { GameData } from "../GameCard/index";

interface Props {
  data: GameData;
}

export const SearchCard = ({ data }: Props): ReactElement => {
  const line = data;
  // const line = {
  //   id: 3,
  //   title: "Mortal Combat 11",
  //   price: 39.99,
  //   currency: "$",
  //   image: "/assets/images/MK_11.jpg",
  //   rating: 4.5,
  //   platforms: ["/assets/images/xbox.png", "/assets/images/playstation.png"],
  //   description: "Mortal Kombat is back and better than ever in the next evolution of the iconic franchise.",
  //   ageRating: 18,
  // };
  return (
    <div className={style.container}>
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

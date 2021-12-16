import style from "./style.module.css";
import { IGameData, DataRow, CustomButton } from "@/components/components";
import { GAME_PLATFORMS } from "@/constants";
import { ChangeEvent, useEffect, useState } from "react";

interface Props {
  data?: IGameData;
  onSubmit: Function;
}

const initialGame: IGameData = {
  id: 0,
  title: "New game",
  price: 1,
  currency: "$",
  image: "/assets/images/pc.png",
  rating: 5,
  platforms: ["/assets/images/pc.png"],
  platformsSelector: ["pc"],
  description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, expedita.",
  ageRating: 18,
  genre: "action",
};

export const GameCardForm = ({ data = initialGame, onSubmit }: Props) => {
  const [gameCard, setGameCard] = useState<IGameData>(initialGame);
  const [isEditing, setIsEditing] = useState(false);

  const changeTitle = (title: string) => {
    if (title.toLowerCase() !== gameCard.title.toLowerCase()) {
      setGameCard((state) => ({ ...state, title: title }));
      return true;
    }
    return false;
  };

  const changeGenre = (genre: string) => {
    if (gameCard.genre.toLowerCase() !== genre.toLowerCase()) {
      setGameCard((game) => ({ ...game, genre: genre }));
      return true;
    }
    return false;
  };

  const changePrice = (value: number) => {
    if (gameCard.price !== +value) {
      setGameCard((game) => ({ ...game, price: +value }));
    }
    return false;
  };

  const changeImage = (url: string) => {
    if (gameCard.image.toLowerCase() !== url.toLowerCase()) {
      setGameCard((game) => ({ ...game, image: url }));
      return true;
    }
    return false;
  };

  const changeDescription = (description: string) => {
    if (gameCard.description.toLowerCase() !== description.toLowerCase()) {
      setGameCard((game) => ({ ...game, description: description }));
      return true;
    }
    return false;
  };

  const changePlatforms = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const { checked } = e.target;
    if (checked) {
      setGameCard((game) => ({
        ...game,
        platformsSelector: [...game.platformsSelector, value],
        platforms: [...game.platforms, GAME_PLATFORMS.find((platform) => platform.selector === value)?.icon || ""],
      }));
    } else {
      setGameCard((game) => ({
        ...game,
        platformsSelector: [...game.platformsSelector.filter((item) => item !== value)],
        platforms: [
          ...game.platforms.filter(
            (item) => item !== GAME_PLATFORMS.find((plaform) => plaform.selector === value)?.icon
          ),
        ],
      }));
    }
  };

  const changeAge = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (gameCard.ageRating !== +value) {
      setGameCard((game) => ({
        ...game,
        ageRating: +((+value < 0 && "0") || (+value > 18 && 18) || +value),
      }));
    }
  };

  useEffect(() => {
    if (data) setGameCard(data);
  }, []);

  const submitData = () => {
    onSubmit(gameCard);
  };
  return (
    <>
      <div className={style.modalContainer}>
        <div className={style.modalImage}>
          <p>Card image</p>
          <img src={gameCard.image} alt={gameCard.title} />
        </div>
        <div className={style.modalGameInfo}>
          <p>Information</p>
          <DataRow
            isEditable={!isEditing}
            title={"Name"}
            content={gameCard.title}
            onEditing={setIsEditing}
            onChange={changeTitle}
          />
          <DataRow
            isEditable={!isEditing}
            title={"Genre"}
            content={gameCard.genre}
            onEditing={setIsEditing}
            onChange={changeGenre}
          />
          <DataRow
            isEditable={!isEditing}
            title={"Price"}
            content={gameCard.price}
            onEditing={setIsEditing}
            onChange={changePrice}
          />
          <DataRow
            isEditable={!isEditing}
            title={"Image"}
            content={gameCard.image}
            onEditing={setIsEditing}
            onChange={changeImage}
          />
          <DataRow
            isEditable={!isEditing}
            title={"Description"}
            isTextArea={true}
            content={gameCard.description}
            onEditing={setIsEditing}
            onChange={changeDescription}
          />
          <div className={style.modalAgeInputContainer}>
            <label htmlFor="">Age rating</label>
            <input type="number" className={style.modalAgeInput} value={gameCard.ageRating} onChange={changeAge} />
          </div>
          <p>Platforms</p>
          {GAME_PLATFORMS.map((platform) => {
            return (
              <div className={style.modalCheckbox} key={platform.selector}>
                <label htmlFor={platform.selector}>{platform.title}</label>
                <input
                  checked={gameCard.platformsSelector.includes(platform.selector)}
                  type="checkbox"
                  onChange={changePlatforms}
                  id={platform.selector}
                  value={platform.selector}
                />
              </div>
            );
          })}
        </div>
      </div>
      <CustomButton className={style.button} onClick={submitData} title={"Create"}/>
    </>
  );
};

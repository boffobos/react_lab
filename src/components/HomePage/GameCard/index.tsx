import style from "./style.module.css";
import { useDispatch, useSelector } from "react-redux";
import { ChangeEvent, useState } from "react";
import { Modal, DataRow } from "../../components";

export interface IGameData {
  id: number;
  title: string;
  price: number;
  currency: string;
  image: string;
  rating: number;
  platforms: string[];
  platformsSelector: string[];
  description: string;
  ageRating: number;
}

interface Props {
  data: IGameData;
  selectedPlatform?: string;
}

export const GameCard = (props: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const userRole = useSelector((state) => state.users.role);
  const userName = useSelector((state) => state.users.userName);
  const game = props.data;
  const dispatch = useDispatch();
  //game card state from editing
  const [gameCard, setGameCard] = useState<IGameData>(props.data);
  const changeTitle = (title: string) => {
    setGameCard((game) => ({ ...game, title: title }));
    setGameCardInfo((state) => ({ ...state, gameName: title }));
    return true;
  };

  const changePrice = (value: number) => {
    setGameCard((game) => ({ ...game, price: +value }));
    setGameCardInfo((state) => ({ ...state, gamePrice: +value }));
    return true;
  };

  const changeImage = (url: string) => {
    setGameCard((game) => ({ ...game, image: url }));
    return true;
  };

  const changeDescription = (description: string) => {
    setGameCard((game) => ({ ...game, description: description }));
    return true;
  };
  //seting up data of particulad card for using it in redux store as cart item
  const [gameCardInfo, setGameCardInfo] = useState({
    gameId: game.id,
    gameName: game.title,
    gamePrice: game.price,
    gameCurrency: game.currency,
    gamePlatforms: game.platformsSelector,
    selectedPlatform: props.selectedPlatform || "",
  });
  const addToCart = () => {
    if (userName) dispatch({ type: "item/addedToCart", payload: gameCardInfo });
    else alert("Please, login");
  };
  const rating = (rate: number) => {
    let arr = [];
    for (let i = 1; i <= rate; i++) {
      arr.push("★");
    }
    return arr;
  };

  return (
    <>
      <div className={style.container}>
        <div className={style.containerFront}>
          <div className={style.gameImage}>
            <div className={style.platforms}>
              {game.platforms.map((platform, index) => {
                return (
                  <span className={style.gamePlatform} key={index}>
                    <img src={platform} alt="platform icon" className={style.platformIcon} />
                  </span>
                );
              })}
            </div>
            <img src={game.image} alt="game image" />
          </div>
          <div className={style.cardBasement}>
            <div className={style.title}>
              <div className={style.name}>{game.title}</div>
              <div className={style.price}>
                {game.price}
                <span className={style.currency}>{game.currency}</span>
              </div>
            </div>
            <div>
              {rating(game.rating).map((item, index) => {
                return (
                  <div className={style.stars} key={index}>
                    {item}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className={style.containerBack}>
          <div>{game.description}</div>
          <div>
            {game.ageRating}
            <span>+</span>
          </div>
          {userRole === "admin" ? (
            <div className={style.btnContainer}>
              <button type="button" className={style.button} onClick={() => alert("Are you sure?")}>
                Remove
              </button>
              <button type="button" className={style.button} onClick={() => setIsModalOpen(true)}>
                Edit
              </button>
            </div>
          ) : (
            <button type="button" className={style.button} onClick={addToCart}>
              Add to cart
            </button>
          )}
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} modalName="Edit Card" className={style.modal}>
        <div className={style.modalContainer}>
          <div className={style.modalImage}>
            <p>Card image</p>
            <img src={game.image} alt={game.title} />
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
          </div>
        </div>
        <button className={style.button}>Submit</button>
        <button className={style.button}>Delete card</button>
      </Modal>
    </>
  );
};

import style from "./style.module.css";
import { useDispatch, useSelector } from "react-redux";
import { ChangeEvent, useEffect, useState } from "react";
import { Modal, DataRow, Notification, INotification } from "../../components";
import { GAME_PLATFORMS } from "@/constants";
import axios from "axios";
import { CustomButton } from "@/components/CustomButton";
import { useNotification } from "@/hooks/useNotification";

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
  genre: string;
}

interface Props {
  data: IGameData;
  selectedPlatform?: string;
}

export const GameCard = (props: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const userRole = useSelector((state) => state.users.role);
  const userName = useSelector((state) => state.users.userName);
  const game = props.data;
  const dispatch = useDispatch();
  //game card state from edit modal
  const [notify, setNotify] = useState<INotification>({ message: "", status: "" });
  const sendNotification = useNotification();
  const [isEditing, setIsEditing] = useState(false);
  const [gameCard, setGameCard] = useState<IGameData>(props.data);
  const [isCardEdited, setIsCardEdited] = useState(false);
  const [sendData, setSendData] = useState(false);

  const changeTitle = (title: string) => {
    if (gameCard.title.toLocaleLowerCase() !== title.toLocaleLowerCase()) {
      setGameCard((game) => ({ ...game, title: title }));
      setGameCardInfo((state) => ({ ...state, gameName: title }));
      setIsCardEdited(true);
      return true;
    }
    return false;
  };

  const changeGenre = (genre: string) => {
    if (gameCard.genre.toLowerCase() !== genre.toLowerCase()) {
      setGameCard((game) => ({ ...game, genre: genre }));
      setIsCardEdited(true);
      return true;
    }
    return false;
  };

  const changePrice = (value: number) => {
    if (gameCard.price !== +value) {
      setGameCard((game) => ({ ...game, price: +value }));
      setGameCardInfo((state) => ({ ...state, gamePrice: +value }));
      setIsCardEdited(true);
      return true;
    }
    return false;
  };

  const changeImage = (url: string) => {
    if (gameCard.image.toLowerCase() !== url.toLowerCase()) {
      setGameCard((game) => ({ ...game, image: url }));
      setIsCardEdited(true);
      return true;
    }
    return false;
  };

  const changeDescription = (description: string) => {
    if (gameCard.description.toLowerCase() !== description.toLowerCase()) {
      setGameCard((game) => ({ ...game, description: description }));
      setIsCardEdited(true);
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
    setIsCardEdited(true);
  };

  const changeAge = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (gameCard.ageRating !== +value) {
      setGameCard((game) => ({
        ...game,
        ageRating: +((+value < 0 && "0") || (+value > 18 && 18) || +value),
      }));
      setIsCardEdited(true);
    }
  };
  //sending edited data to server
  useEffect(() => {
    if (isCardEdited) {
      axios.put("api/product", gameCard).then((response) => {
        if (response.status === 200) {
          dispatch({ type: "games/changed", payload: response.data });
          closeModal();
          setNotify({ message: "Game card has been changed!", status: "success" });
        } else {
          closeModal();
          setNotify({ message: "Something goes wrong", status: "error" });
        }
      });
      setIsCardEdited(false);
    }
  }, [sendData]);

  useEffect(() => {
    if (notify.message) {
      sendNotification(notify);
    }
  }, [notify]);

  const closeModal = () => {
    setIsModalOpen(false);
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

  const confirmations = () => {
    setIsConfirmOpen(true);
  };

  const selfDestroy = () => {
    setTimeout(() => dispatch({ type: "games/removed", payload: gameCard }), 500);
    setIsConfirmOpen(false);
    setNotify({ message: "Game card has been removed!", status: "success" });
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
              <button type="button" className={style.button} onClick={addToCart}>
                Add to cart
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
      {/* modal card editor*/}
      <Modal isOpen={isModalOpen} onClose={closeModal} modalName="Edit Card" className={style.modal}>
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
        <button className={style.button} disabled={!isCardEdited} onClick={() => setSendData((state) => !state)}>
          Submit
        </button>
        <button className={style.button} onClick={confirmations}>
          Delete card
        </button>
      </Modal>
      <Modal modalName={"Are you sure"} onClose={() => setIsConfirmOpen(false)} isOpen={isConfirmOpen}>
        <div className={style.modalButtonsContainer}>
          <p>You are about to delete game card "{gameCard.title}"</p>
          <CustomButton className={style.confirmBtn} title={"Confirm"} onClick={selfDestroy} />
          <CustomButton className={style.closeBtn} title={"Close"} onClick={() => setIsConfirmOpen(false)} />
        </div>
      </Modal>
    </>
  );
};

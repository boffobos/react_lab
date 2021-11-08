import style from "./style.module.css";

interface GameData {
  id: number;
  title: string;
  price: number;
  currency: string;
  image: string;
  rating: number;
  platforms: string[];
  description: string;
  ageRating: number;
}

interface Props {
  data?: GameData;
}

export const GameCard = (props: Props) => {
  const game = props.data || {
    id: 1,
    title: "World of warcraft",
    price: 23.99,
    currency: "$",
    image: "/assets/images/wow_card.jpg",
    rating: 5,
    platforms: ["/assets/images/pc.png", "/assets/images/xbox.png", "/assets/images/playstation.png"],
    description: "The World of Warcraft Trading Card Game draws from the rich lore of the Warcraft universe. T",
    ageRating: 14,
  };

  const rating = (rate: number) => {
    let arr = [];
    for (let i = 1; i <= rate; i++) {
      arr.push("★");
    }
    console.log(arr);
    return arr;
  };

  return (
    <div className={style.container}>
      <div className={style.innerContainer}>
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
          <button type="button" className={style.button}>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

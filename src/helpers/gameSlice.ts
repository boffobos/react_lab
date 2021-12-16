import { IGameData } from "../components/components";
import { useSelector } from "react-redux";

const initialState: IGameData[] = [];

const getGameId = () => {
  const games = useSelector((state) => state.games);
  let maxId = 0;
  games.forEach((game) => {
    if (game.id > maxId) maxId = game.id;
  });
  return maxId;
};

export const gameReducer = (
  state: IGameData[] = initialState,
  action: { type: string; payload: IGameData[] | IGameData }
) => {
  switch (action.type) {
    case "games/added": {
      const gamesArr = action.payload;
      const filteredGamesArr = gamesArr.filter((game) => {
        return !state.find((item) => item.title.toLowerCase() === game.title.toLowerCase());
      });

      return [...state, ...filteredGamesArr];
    }
    case "games/changed": {
      const game = action.payload;
      if (state.find((item) => item.id === game.id)) {
        const arr = state.filter((item) => item.id !== game.id);
        return [...arr, game];
      }
      return state;
    }
    case "games/created": {
      const games = action.payload;
      games.forEach((game) => {
        if (!state.find((item) => item.id === game.id)) {
          const newId = getGameId();
          return [
            ...state,
            {
              id: newId,
              ...game,
            },
          ];
        }
      });
    }
    case "games/removed": {
      const game = action.payload;
      const filtered = state.filter((item) => item.id !== game.id);
      return [...filtered];
    }
    default:
      return state;
  }
};

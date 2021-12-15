import { combineReducers } from "redux";
import { userReducer } from "../helpers/userSlice";
import { gameReducer } from "./gameSlice";
import { IGameData } from "../components/components";
import { DefaultRootState } from "react-redux";
declare module "react-redux" {
  interface DefaultRootState {
    users: {
      userName: string;
      userId: number;
      avatar: string;
      loggedInTime: Date;
      role: string;
      ballance: number;
      cartItems: {
        gameId: number;
        gameName: string;
        gamePrice: number;
        gameCurrency: string;
        gamePlatforms: string[];
        selectedPlatform: string;
        quantity: number;
      }[];
    };
    games: IGameData[];
  }
}

export const rootReducer = combineReducers<DefaultRootState>({
  users: userReducer,
  games: gameReducer,
});

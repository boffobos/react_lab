import { combineReducers } from "redux";
import { userReducer } from "../helpers/userSlice";
import { gameReducer } from "./gameSlice";



export const rootReducer = combineReducers({
  users: userReducer,
  games: gameReducer,
});

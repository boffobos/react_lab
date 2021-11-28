import { combineReducers } from "redux";
import { userReducer } from "../helpers/userSlice";

export const rootReducer = combineReducers({
  users: userReducer,
});

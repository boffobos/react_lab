import { createStore, applyMiddleware } from "redux";
import { rootReducer } from "./reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";

const enhansers = composeWithDevTools(applyMiddleware(thunkMiddleware));

export const store = createStore(rootReducer, enhansers);

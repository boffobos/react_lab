interface IUserState {
  userName: string | null;
  loggedInTime: number | null;
  cartItems?: ICartGameItem[];
}

interface ICartGameItem {
  gameId: number;
  gameName: string;
  gamePrice: number;
}

interface IUserAction {
  type: string;
  payload: string | undefined | ICartGameItem;
}

const initialState = {
  userName: null,
  loggedInTime: null,
  cartItems: [],
};

export const userReducer = (state: IUserState = initialState, action: IUserAction) => {
  switch (action.type) {
    case "users/login": {
      return {
        ...state,
        userName: action.payload,
        loggedInTime: Date.now(),
      };
    }
    case "users/logOut": {
      return {
        ...state,
        userName: null,
        loggedInTime: null,
        cartItems: [],
      };
    }
    case "users/addedToCart": {
      return {
        ...state,
        cartItems: [
          ...state.cartItems,
          {
            gameId: action.payload.gameId,
            gameName: action.payload.gameName,
            gamePrice: action.payload.gamePrice,
          },
        ],
      };
    }
    default:
      return state;
  }
};

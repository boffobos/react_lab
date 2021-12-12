interface IUserState {
  userName: string | null;
  userId: number | null;
  avatar: string;
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

// const initialState = {
//   userName: "",
//   userId: null,
//   avatar: "",
//   loggedInTime: null,
//   cartItems: [],
// };

//user data for test reasons
const initialState = {
  userName: "Denis",
  userId: 1,
  avatar: "/assets/images/avatars/Morty.jpg",
  loggedInTime: Date(),
  cartItems: [],
};

export const userReducer = (state: IUserState = initialState, action: IUserAction) => {
  switch (action.type) {
    case "users/login": {
      return {
        ...state,
        userName: action.payload.login,
        userId: action.payload.id,
        avatar: action.payload.avatar,
        loggedInTime: Date.now(),
      };
    }
    case "users/logOut": {
      return {
        ...state,
        userName: null,
        userId: null,
        avatar: null,
        loggedInTime: null,
        cartItems: [],
      };
    }
    case "users/addedToCart": {
      if (action.payload) {
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
    }
    default:
      return state;
  }
};

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
  cartItems: [
    {
      gameId: 1,
      gameName: "World of warcraft",
      gamePrice: 23.99,
      gameCurrency: "$",
      gamePlatforms: ["pc"],
      selectedPlatform: "pc",
      quantity: 1,
    },
    {
      gameId: 6,
      gameName: "Fallout 2",
      gamePrice: 10.99,
      gameCurrency: "$",
      gamePlatforms: ["pc"],
      selectedPlatform: "pc",
      quantity: 1,
    },
    {
      gameId: 7,
      gameName: "Minecraft",
      gamePrice: 0.99,
      gameCurrency: "$",
      gamePlatforms: ["xboxOne", "playstation5"],
      selectedPlatform: "xboxOne",
      quantity: 1,
    },
    {
      gameId: 10,
      gameName: "Overwatch",
      gamePrice: 18.99,
      gameCurrency: "$",
      gamePlatforms: ["pc", "xboxOne", "playstation5"],
      selectedPlatform: "playstation5",
      quantity: 1,
    },
  ],
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
        const existedItem = state.cartItems?.find((item) => item.gameId === action.payload.gameId);
        console.log(state.cartItems);
        console.log(existedItem);
        if (existedItem) {
          console.log("if statement");
          return {
            ...state,
            cartItems: [
              { ...existedItem, quantity: existedItem.quantity + 1 },
              ...state.cartItems?.filter((item) => item.gameId !== existedItem.gameId),
            ],
          };
        } else {
          return {
            ...state,
            cartItems: [
              ...state.cartItems,
              {
                gameId: action.payload.gameId,
                gameName: action.payload.gameName,
                gamePrice: action.payload.gamePrice,
                gameCurrency: action.payload.gameCurrency,
                gamePlatforms: action.payload.gamePlatforms,
                selectedPlatform: action.payload.selectedPlatform,
                orderDate: 1,
              },
            ],
          };
        }
      }
    }
    default:
      return state;
  }
};

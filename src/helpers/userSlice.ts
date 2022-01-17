interface IUserState {
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
    selectedPlatform: "pc" | "xboxOne" | "playstation5";
    quantity: number;
  }[];
}

interface IUserAction {
  type: string;
  payload: string;
}

// const initialState = {
//   userName: "",
//   userId: null,
//   avatar: "",
//   loggedInTime: null,
//   role: "user",
//   ballance: 0,
//   cartItems: [],
// };

//user data for test reasons
const initialState = {
  userName: "Denis",
  userId: 1,
  avatar: "/assets/images/avatars/Morty.jpg",
  loggedInTime: Date(),
  role: "admin",
  ballance: 25.96,
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
        role: action.payload.role,
      };
    }
    case "users/logOut": {
      return {
        ...state,
        userName: null,
        userId: null,
        avatar: null,
        loggedInTime: null,
        role: null,
        cartItems: [],
      };
    }
    case "item/addedToCart": {
      if (action.payload) {
        const existedItem = state.cartItems?.find((item) => item.gameId === action.payload.gameId);
        if (existedItem) {
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
                quantity: 1,
              },
            ],
          };
        }
      }
    }
    case "item/changeQuantity": {
      const id = action.payload.gameId;
      const quantity = action.payload.quantity;
      const newCart = state.cartItems?.map((item) => {
        if (+item.gameId === +id) {
          return {
            ...item,
            quantity: +quantity,
          };
        }
        return item;
      });
      return {
        ...state,
        cartItems: [...newCart],
      };
    }
    case "item/changePlatform": {
      const newCart = state.cartItems?.map((item) => {
        if (+item.gameId === +action.payload.gameId) {
          return { ...item, selectedPlatform: action.payload.selectedPlatform };
        }
        return item;
      });
      const item = state.cartItems?.find((item) => +item.gameId === +action.payload.gameId);
      return {
        ...state,
        cartItems: [...newCart],
      };
    }
    case "item/remove": {
      const itemsToRemove = action.payload;
      const newCart = state.cartItems?.filter((item) => !itemsToRemove.includes(item.gameId));
      return {
        ...state,
        cartItems: [...newCart],
      };
    }
    default:
      return state;
  }
};

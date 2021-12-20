/* Modal forms config */
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faRightFromBracket,
  faIdCard,
  faLock,
  faUserAstronaut,
  faShoppingCart,
  faExclamation,
} from "@fortawesome/free-solid-svg-icons";

/*Sign up modal config */
export const signUpFormConfig = {
  button: { type: "submit", text: "Register" },
  children: [
    { name: "login", label: "Login", faIcon: faIdCard, type: "text", autofocus: true },
    { name: "password", label: "Password", faIcon: faLock, type: "password" },
    { name: "rePassword", label: "Repeat Password", faIcon: faLock, type: "password" },
  ],
};

/* Sign in modal config */
export const signInFormConfig = {
  button: { type: "submit", text: "Login" },
  children: [
    { name: "login", label: "Login", faIcon: faIdCard, type: "text", autofocus: true },
    { name: "password", label: "Password", faIcon: faLock, type: "password", autofocus: false },
  ],
};

/* Change Passpord modal config */

export const changePasswordFormConfig = {
  button: { type: "submit", text: "Submit" },
  children: [
    { name: "password", label: "Current Password", faIcon: faLock, type: "password", autofocus: true },
    { name: "newPassword", label: "New Password", faIcon: faLock, type: "password", autofocus: false },
    { name: "rePassword", label: "Repeat Password", faIcon: faLock, type: "password", autofocus: false },
  ],
};

export const userButtonIcon = faUserAstronaut as IconProp;
export const cartButtonIcon = faShoppingCart as IconProp;
export const exitButtonIcon = faRightFromBracket as IconProp;
export const formErrorIcon = faExclamation as IconProp;

export const defaultAvatar = "/assets/images/avatars/AV_1.jpg";

/* Settings for product page */
//Dropdown options
export const sortCriteriaOptions = [
  {
    label: "Name",
    value: "name",
  },
  {
    label: "Age",
    value: "age",
  },
  {
    label: "Rating",
    value: "rating",
  },
  {
    label: "Price",
    value: "price",
  },
];

export const sortTypeOptions = [
  {
    label: "Ascending",
    value: "asc",
  },
  {
    label: "Descending",
    value: "desc",
  },
];

//Radio buttons options
export const genresOptions = [
  {
    label: "All genres",
    value: "all",
    selected: true,
  },
  {
    label: "Actions",
    value: "action",
  },
  {
    label: "RPG",
    value: "rpg",
  },
  {
    label: "RTS",
    value: "rts",
  },
  {
    label: "Arcade",
    value: "arcade",
  },
  {
    label: "Survival",
    value: "survival",
  },
];

export const ageOptions = [
  {
    label: "All ages",
    value: 0,
  },
  {
    label: "3+",
    value: 3,
  },
  {
    label: "6+",
    value: 6,
  },
  {
    label: "12+",
    value: 12,
  },
  {
    label: "18+",
    value: 18,
  },
];

/* Data for mock server  */
export const userDb = [
  {
    id: 1,
    login: "Denis",
    password: "1234",
    avatar: "/assets/images/avatars/Morty.jpg",
    city: "Minsk",
    email: "denis@example.com",
    birthDate: new Date("1995-01-09"),
    description: "Lorem ipsum dolor sit amet.",
    role: "user",
  },
  {
    id: 2,
    login: "Admin",
    password: "qwerty",
    avatar: "/assets/images/avatars/Rick.jpg",
    city: "London",
    email: "admin@example.com",
    birthDate: new Date("1994-04-09"),
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
    role: "admin",
  },
  {
    id: 3,
    login: "User",
    password: "test",
    avatar: "/assets/images/avatars/Summer.jpg",
    city: "Berlin",
    email: "fun@example.com",
    birthDate: new Date("1991-08-01"),
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi, maxime?",
    role: "user",
  },
];

export const gameDb = [
  {
    id: 1,
    title: "World of warcraft",
    price: 23.99,
    currency: "$",
    image: "/assets/images/wow_card.jpg",
    rating: 5,
    platforms: ["/assets/images/pc.png"],
    platformsSelector: ["pc"],
    description: "The World of Warcraft Trading Card Game draws from the rich lore of the Warcraft universe.",
    ageRating: 14,
    genre: "mmorpg",
  },
  {
    id: 2,
    title: "Star Craft II",
    price: 59.99,
    currency: "$",
    image: "/assets/images/Starcraft_card.jpg",
    rating: 4,
    platforms: ["/assets/images/pc.png"],
    platformsSelector: ["pc"],
    description:
      "The story of StarCraft is concluded by following the Protoss Race in their quest to reclaim their homeworld and for Kerrigan to ultimately slay the greatest.",
    ageRating: 12,
    genre: "rts",
  },
  {
    id: 3,
    title: "Mortal Combat 11",
    price: 39.99,
    currency: "$",
    image: "/assets/images/MK_11.jpg",
    rating: 4.5,
    platforms: ["/assets/images/xbox.png", "/assets/images/playstation.png"],
    platformsSelector: ["xboxOne", "playstation5", "pc"],
    description: "Mortal Kombat is back and better than ever in the next evolution of the iconic franchise.",
    ageRating: 18,
    genre: "action",
  },
  {
    id: 4,
    title: "Battle City",
    price: 0.99,
    currency: "$",
    image: "/assets/images/BattleCity.jpg",
    rating: 5,
    platforms: ["/assets/images/xbox.png", "/assets/images/playstation.png"],
    platformsSelector: ["xboxOne", "playstation5"],
    description:
      "Battle City is a multi-directional shooter video game for the Family Computer produced and published in 1985 by Namco.",
    ageRating: 3,
    genre: "arcade",
  },
  {
    id: 5,
    title: "Dune",
    price: 5.99,
    currency: "$",
    image: "/assets/images/Dune.jpg",
    rating: 4,
    platforms: ["/assets/images/pc.png"],
    platformsSelector: ["pc"],
    description: "A number of games have been published based on the Dune universe created by Frank Herbert.",
    ageRating: 10,
    genre: "rts",
  },
  {
    id: 6,
    title: "Fallout 2",
    price: 10.99,
    currency: "$",
    image: "/assets/images/fallout_2.jpg",
    rating: 5,
    platforms: ["/assets/images/pc.png"],
    platformsSelector: ["pc"],
    description:
      "The game's story takes place in 2241, 80 years after the events of Fallout (the first and original installment of the Fallout series) and 164 years after the atomic war which reduced the vast majority of the world to a nuclear wasteland.",
    ageRating: 16,
    genre: "rpg",
  },
  {
    id: 7,
    title: "Minecraft",
    price: 0.99,
    currency: "$",
    image: "/assets/images/minecraft.jpg",
    rating: 4.6,
    platforms: ["/assets/images/xbox.png", "/assets/images/playstation.png"],
    platformsSelector: ["xboxOne", "playstation5"],
    description:
      "Minecraft is a sandbox video game developed by the Swedish video game developer Mojang Studios. The game was created by Markus 'Notch' Persson in the Java programming language.",
    ageRating: 6,
    genre: "survival",
  },
  {
    id: 8,
    title: "Battlefield 2042",
    price: 15.99,
    currency: "$",
    image: "/assets/images/battlefield.jpg",
    rating: 1.7,
    platforms: ["/assets/images/xbox.png", "/assets/images/playstation.png"],
    platformsSelector: ["xboxOne", "playstation5"],
    description:
      "Battlefield 2042 is a first-person shooter video game developed by DICE and published by Electronic Arts.",
    ageRating: 18,
    genre: "action",
  },
  {
    id: 9,
    title: "Sonic Mania",
    price: 8.99,
    currency: "$",
    image: "/assets/images/sonic_mania.jpg",
    rating: 4.6,
    platforms: ["/assets/images/pc.png", "/assets/images/xbox.png", "/assets/images/playstation.png"],
    platformsSelector: ["pc", "xboxOne", "playstation5"],
    description:
      "Sonic Mania is an all-new adventure with Sonic, Tails, and Knuckles full of unique bosses, rolling 2D landscapes, and fun classic gameplay.",
    ageRating: 3,
    genre: "arcade",
  },
  {
    id: 10,
    title: "Overwatch",
    price: 18.99,
    currency: "$",
    image: "/assets/images/Overwatch.jpg",
    rating: 4.1,
    platforms: ["/assets/images/pc.png", "/assets/images/xbox.png", "/assets/images/playstation.png"],
    platformsSelector: ["pc", "xboxOne", "playstation5"],
    description:
      "Overwatch is a 2016 team-based multiplayer first-person shooter game developed and published by Blizzard Entertainment. Described as a 'hero shooter', Overwatch assigns players into two teams of six, with each player selecting from a large roster of characters, known as 'heroes', with unique abilities.",
    ageRating: 16,
    genre: "action",
  },
  {
    id: 11,
    title: "DOOM eternal",
    price: 13.99,
    currency: "$",
    image: "/assets/images/Doom_Eternal.jpg",
    rating: 4.5,
    platforms: ["/assets/images/pc.png", "/assets/images/xbox.png"],
    platformsSelector: ["pc", "xboxOne"],
    description:
      "Become the Slayer in an epic single-player campaign to conquer demons across dimensions and stop the final destruction of humanity.",
    ageRating: 18,
    genre: "action",
  },
  {
    id: 12,
    title: "Skyrim",
    price: 21.99,
    currency: "$",
    image: "/assets/images/Skyrim.jpg",
    rating: 4.8,
    platforms: ["/assets/images/pc.png", "/assets/images/xbox.png"],
    platformsSelector: ["pc", "xboxOne"],
    description:
      "The Elder Scrolls V: Skyrim, the 2011 Game of the Year, is the next chapter in the highly anticipated Elder Scrolls saga.",
    ageRating: 18,
    genre: "rpg",
  },
  {
    id: 13,
    title: "Fallout 4",
    price: 21.99,
    currency: "$",
    image: "/assets/images/Fallout_4.jpg",
    rating: 4.5,
    platforms: ["/assets/images/pc.png", "/assets/images/xbox.png", "/assets/images/playstation.png"],
    platformsSelector: ["pc", "xboxOne", "playstation5"],
    description:
      "Bethesda Game Studios, the creators of Skyrim and Fallout 4, welcome you to Fallout 76, the online prequel where every surviving human is a real person.",
    ageRating: 18,
    genre: "rpg",
  },
  {
    id: 14,
    title: "Grand Theft Auto V",
    price: 24.99,
    currency: "$",
    image: "/assets/images/Grand_Theft_Auto_V.jpg",
    rating: 4.4,
    platforms: ["/assets/images/pc.png", "/assets/images/xbox.png", "/assets/images/playstation.png"],
    platformsSelector: ["pc", "xboxOne", "playstation5"],
    description:
      "Grand Theft Auto V is a 2013 action-adventure game developed by Rockstar North and published by Rockstar Games. It is the seventh main entry in the Grand Theft Auto series, following 2008's Grand Theft Auto IV, and the fifteenth instalment overall.",
    ageRating: 18,
    genre: "action",
  },
];

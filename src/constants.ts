import { Option } from "react-dropdown";

/* Application variables*/
export const NOTIFICATION_TIMEOUT = 2500;
export const PASSWORD_LENGTH = 6;
export const SITE_NAME: string = "Game Store";
export const HOME_URL: string = "/";
export const PRODUCTS_URL: string = "/products";
export const PRODUCT_CATEGORIE_URL: string[] = ["/products/pc", "/products/xboxOne", "products/playstation5"];
export const ABOUT_URL: string = "/about";
export const SIGNIN_URL: string = "/sign-in";
export const SIGNUP_URL: string = "/sign-up";
export const PROFILE_URL: string = "/profile";
export const CART_URL: string = "/cart";
export const DROPDOWN_OPTIONS: Option[] = [
  { value: "/products/pc", label: "PC" },
  { value: "/products/xboxOne", label: "XBox One" },
  { value: "/products/playstation5", label: "Playstation 5" },
  // { value: '/products/mobile', label: 'Mobile' },
];
export const NAVBAR_OPTIONS = [
  { id: 1, title: "Home", url: "/" },
  { id: 2, title: "Products", url: "/products", dropdown: DROPDOWN_OPTIONS },
  { id: 3, title: "About", url: "/about" },
  // { id: 4, title: "Sign in" },
  // { id: 5, title: "Sign up" },
];
export const GAME_PLATFORMS = [
  { id: 1, title: "PC", icon: "/assets/images/pc.png", alt: "PC icon", url: "/products/pc", selector: "pc" },
  {
    id: 2,
    title: "XBox One",
    icon: "/assets/images/xbox.png",
    alt: "XBox One icon",
    url: "/products/xboxOne",
    selector: "xboxOne",
  },
  {
    id: 3,
    title: "Playstation 5",
    icon: "/assets/images/playstation.png",
    alt: "Playstation icon",
    url: "products/playstation5",
    selector: "playstation5",
  },
];

export const IGameDataExaple = {
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
};

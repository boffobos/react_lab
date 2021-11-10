import { Option } from "react-dropdown";

export const HOME_URL: string = "/";
export const PRODUCTS_URL: string = "/products";
export const PRODUCT_CATEGORIE_URL: string[] = ["/products/pc", "/products/xbox", "products/playstation5"];
export const ABOUT_URL: string = "/about";
export const SIGNIN_URL: string = "/sign-in";
export const SIGNUP_URL: string = "/sign-up";
export const SITE_NAME: string = "Game Store";
export const DROPDOWN_OPTIONS: Option[] = [
  { value: "/products/pc", label: "PC" },
  { value: "/products/xbox", label: "XBox One" },
  { value: "/products/playstation5", label: "Playstation 5" },
  // { value: '/products/mobile', label: 'Mobile' },
];
export const NAVBAR_OPTIONS = [
  { id: 1, title: "Home", url: "/" },
  { id: 2, title: "Products", url: "/products", dropdown: DROPDOWN_OPTIONS },
  { id: 3, title: "About", url: "/about" },
  { id: 4, title: "Sign in", url: "/sign-in" },
  { id: 5, title: "Sign up", url: "/sign-up" },
];
export const GAME_PLATFORMS = [
  { id: 1, title: "PC", icon: "/assets/images/pc.png", alt: "PC icon", url: "/products/pc" },
  { id: 2, title: "XBox One", icon: "/assets/images/xbox.png", alt: "XBox One icon", url: "/products/xbox" },
  {
    id: 3,
    title: "Playstation 5",
    icon: "/assets/images/playstation.png",
    alt: "Playstation icon",
    url: "products/playstation5",
  },
];

export const gameDataExaple = {
  id: 1,
  title: "World of warcraft",
  price: 23.99,
  currency: "$",
  image: "/assets/images/wow_card.jpg",
  rating: 5,
  platforms: ["/assets/images/pc.png", "/assets/images/xbox.png", "/assets/images/playstation.png"],
  description: "The World of Warcraft Trading Card Game draws from the rich lore of the Warcraft universe. T",
  ageRating: 14,
};

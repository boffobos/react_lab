import { Option } from "react-dropdown";

export const HOME_URL: string = "/";
export const PRODUCTS_URL: string = "/products";
export const ABOUT_URL: string = "/about";
export const SIGNIN_URL: string = "/sign-in";
export const SIGNUP_URL: string = "/sign-up";
export const SITE_NAME: string = "Game Store";
export const DROPDOWN_OPTIONS: Option[] = [
  { value: "/products/pc", label: "PC" },
  { value: "/products/xbox", label: "XBox One" },
  { value: "/products/playstation5", label: "Playstation 5" },
  // { value: "/products/mobile", label: "Mobile" },
];
export const NAVBAR_OPTIONS = [
  { id: 1, title: "Home", url: "/" },
  { id: 2, title: "Products", url: "/products", dropdown: DROPDOWN_OPTIONS },
  { id: 3, title: "About", url: "/about" },
  { id: 4, title: "Sign in", url: "/sign-in" },
  { id: 5, title: "Sign up", url: "/sign-up" },
];
export const GAME_PLATFORMS = [
  { id: 1, title: "PC", icon: "/assets/images/pc.png", alt: "PC icon" },
  { id: 2, title: "XBox One", icon: "/assets/images/xbox.png", alt: "XBox One icon" },
  { id: 3, title: "Playstation 5", icon: "/assets/images/playstation.png", alt: "Playstation icon" },
];

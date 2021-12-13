export const getPlatformFromSelector = (platformTitle: string | undefined | null) => {
  switch (platformTitle) {
    case "pc": {
      return "PC";
    }
    case "xboxOne": {
      return "XBox One";
    }
    case "playstation5": {
      return "Playstation 5";
    }
    default:
      return "Products";
  }
};

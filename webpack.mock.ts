// eslint-disable-next-line import/no-extraneous-dependencies
import webpackMockServer from "webpack-mock-server";

const gameDb = [
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
    image: "/assets/images/BattleCity.png",
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
    image: "/assets/images/Dune.png",
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
    image: "/assets/images/minecraft.png",
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
    image: "/assets/images/Doom_Eternal.png",
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
    image: "/assets/images/Skyrim.png",
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
    image: "/assets/images/Grand_Theft_Auto_V.png",
    rating: 4.4,
    platforms: ["/assets/images/pc.png", "/assets/images/xbox.png", "/assets/images/playstation.png"],
    platformsSelector: ["pc", "xboxOne", "playstation5"],
    description:
      "Grand Theft Auto V is a 2013 action-adventure game developed by Rockstar North and published by Rockstar Games. It is the seventh main entry in the Grand Theft Auto series, following 2008's Grand Theft Auto IV, and the fifteenth instalment overall.",
    ageRating: 18,
    genre: "action",
  },
];

const userDb = [
  {
    id: 1,
    login: "Denis",
    password: "1234",
    avatar: "/assets/images/avatars/Morty.jpg",
    city: "Minsk",
    email: "denis@example.com",
    birthDate: new Date("1995-01-09"),
    description: "Lorem ipsum dolor sit amet.",
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
  },
];

export default webpackMockServer.add((app /* helper */) => {
  app.get("/api/getTopProducts", (_req, res) => {
    function getRandomGames(number: number) {
      const set = new Set();
      const ranNum = () => {
        return Math.floor(Math.random() * gameDb.length + 1) - 1;
      };
      while (set.size < number) {
        set.add(gameDb[ranNum()]);
      }
      return Array.from(set);
    }
    const response = getRandomGames(3);

    res.json(response);
  });

  app.get("/api/search/:search", (_req, res) => {
    const response: Array<object> = [];
    gameDb.forEach((item) => {
      if (item.title.toLowerCase().includes(_req.params.search.toLowerCase())) response.push(item);
    });

    res.json(response);
  });

  app.post("/testPostMock", (req, res) => {
    res.status(201).json({ body: req.body || null, success: true });
  });

  app.post("/api/auth/signIn", (req, res) => {
    const pass = req.body.password;
    const login = req.body.login;

    userDb.forEach((user) => {
      if (pass === user.password && login.toLowerCase() === user.login.toLowerCase()) {
        res.status(201).json({ body: { id: user.id, login: user.login, avatar: user.avatar }, success: true });
      }
    });
    res.status(204).send("Auth failed");
  });

  app.put("/api/auth/signUp", (req, res) => {
    const userData = {
      id: getNextId(),
      login: "",
      avatar: "/assets/images/avatars/AV_1.jpg",
    };
    const data = req.body;
    function getNextId() {
      let id = -1;
      userDb.forEach((user) => {
        if (user.id > id) id = user.id;
      });
      return id + 1;
    }
    userData.login = data.login[0].toUpperCase() + req.body.login.slice(1).toLowerCase();
    res.status(200).json(userData);
  });

  app.get("/api/getProfile/:id", (req, res) => {
    function getUserDataById(id: number | string) {
      //also we should check some token we have sent to user during user authentification due to sequrity reason
      id = +id;
      const userData = {
        id: id,
        login: "new User",
        avatar: "/assets/images/avatars/Av_1.jpg",
        city: "Default City",
        email: "ex@examle.com",
        birthDate: "05.11.2001",
        description: "New user enter description here",
      };

      const isUserExist = userDb.some((user) => {
        if (user.id === id) {
          userData.id = user.id;
          userData.login = user.login;
          userData.avatar = user.avatar;
          userData.city = user.city;
          userData.email = user.email;
          userData.birthDate = user.birthDate.toLocaleString("ru-RU");
          userData.description = user.description;
          return true;
        }
      });
      return { userData, isUserExist };
    }
    const response = getUserDataById(req.params.id);
    if (response.isUserExist) res.json(response.userData);
    else res.json(getUserDataById(req.params.id).userData);
  });
  // api for changing user password
  app.post("/api/changePassword", (req, res) => {
    function getUserById(id: number) {
      //also we should check some token we have sent to user during user authentification due to sequrity reason
      let userFind = null;
      const isUserExist = userDb.some((user) => {
        if (user.id === id) {
          userFind = user;
          return true;
        }
      });
      return { userFind, isUserExist };
    }
    let reqUser = getUserById(req.body.id);
    if (reqUser.isUserExist && req.body.password === reqUser.userFind.password) {
      console.log("password changed");
      res.status(201).send();
    } else if (reqUser.isUserExist) {
      console.log("password fail");
      res.status(204).send();
    }
  });
  //api for changing user data from profile page
  app.post("/api/changeProfile", (req, res) => {
    const userData = req.body;
    res.status(201).json(userData).send();
  });
  //handling produt page requests
  app.get("/api/products/:platform/:genre/:age/:searchName/", (req, res) => {
    const params = req.params;

    const filterGamesByParams = (paramsObj) => {
      let filtGames = gameDb;
      if (paramsObj.searchName === "$all") {
      } else if (paramsObj.searchName) {
        filtGames = filtGames.filter((game) => game.title.toLowerCase().includes(paramsObj.searchName.toLowerCase()));
      }
      if (paramsObj.platform) {
        filtGames = filtGames.filter((game) => game.platformsSelector.includes(paramsObj.platform));
      }
      if (paramsObj.genre === "all") {
      } else if (paramsObj.genre) {
        filtGames = filtGames.filter((game) => game.genre.includes(paramsObj.genre));
      }
      if (+paramsObj.age) {
        filtGames = filtGames.filter((game) => game.ageRating <= +paramsObj.age);
      }
      return filtGames;
    };

    setTimeout(() => res.json(filterGamesByParams(params)).send, 3000);
  });
});

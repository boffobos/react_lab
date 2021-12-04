// eslint-disable-next-line import/no-extraneous-dependencies
import webpackMockServer from "webpack-mock-server";
import { date, number, string } from "yup/lib/locale";

const gameDb = [
  {
    id: 1,
    title: "World of warcraft",
    price: 23.99,
    currency: "$",
    image: "/assets/images/wow_card.jpg",
    rating: 5,
    platforms: ["/assets/images/pc.png", "/assets/images/xbox.png", "/assets/images/playstation.png"],
    description: "The World of Warcraft Trading Card Game draws from the rich lore of the Warcraft universe.",
    ageRating: 14,
  },
  {
    id: 2,
    title: "Star Craft II",
    price: 59.99,
    currency: "$",
    image: "/assets/images/Starcraft_card.jpg",
    rating: 4,
    platforms: ["/assets/images/pc.png"],
    description:
      "The story of StarCraft is concluded by following the Protoss Race in their quest to reclaim their homeworld and for Kerrigan to ultimately slay the greatest.",
    ageRating: 12,
  },
  {
    id: 3,
    title: "Mortal Combat 11",
    price: 39.99,
    currency: "$",
    image: "/assets/images/MK_11.jpg",
    rating: 4.5,
    platforms: ["/assets/images/xbox.png", "/assets/images/playstation.png"],
    description: "Mortal Kombat is back and better than ever in the next evolution of the iconic franchise.",
    ageRating: 18,
  },
  {
    id: 4,
    title: "Battle City",
    price: 0.99,
    currency: "$",
    image: "/assets/images/BattleCity.png",
    rating: 5,
    platforms: ["/assets/images/xbox.png", "/assets/images/playstation.png"],
    description:
      "Battle City is a multi-directional shooter video game for the Family Computer produced and published in 1985 by Namco.",
    ageRating: 3,
  },
  {
    id: 5,
    title: "Dune",
    price: 5.99,
    currency: "$",
    image: "/assets/images/Dune.png",
    rating: 4,
    platforms: ["/assets/images/pc.png"],
    description: "A number of games have been published based on the Dune universe created by Frank Herbert.",
    ageRating: 10,
  },
  {
    id: 6,
    title: "Fallout 2",
    price: 10.99,
    currency: "$",
    image: "/assets/images/fallout_2.jpg",
    rating: 5,
    platforms: ["/assets/images/pc.png"],
    description:
      "The game's story takes place in 2241, 80 years after the events of Fallout (the first and original installment of the Fallout series) and 164 years after the atomic war which reduced the vast majority of the world to a nuclear wasteland.",
    ageRating: 16,
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

export default webpackMockServer.add((app, helper) => {
  app.get("/api/getTopProducts", (_req, res) => {
    // const response = {
    //   id: helper.getUniqueIdInt(),
    //   randomInt: helper.getRandomInt(),
    //   lastDate: new Date(),
    // };
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
});

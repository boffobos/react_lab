// eslint-disable-next-line import/no-extraneous-dependencies
import webpackMockServer from "webpack-mock-server";
import { userDb, gameDb } from "./src/config/config";

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
        res
          .status(201)
          .json({ body: { id: user.id, login: user.login, avatar: user.avatar, role: user.role }, success: true });
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
      let filtGames = [...gameDb];
      if (paramsObj.searchName === "$all") {
        //skip filtering
      } else if (paramsObj.searchName) {
        filtGames = filtGames.filter((game) => game.title.toLowerCase().includes(paramsObj.searchName.toLowerCase()));
      }
      if (paramsObj.platform === "$all") {
        //skip filtering
      } else {
        filtGames = filtGames.filter((game) => game.platformsSelector.includes(paramsObj.platform));
      }
      if (paramsObj.genre === "all") {
        //skip filtering
      } else if (paramsObj.genre) {
        filtGames = filtGames.filter((game) => game.genre.includes(paramsObj.genre));
      }
      if (+paramsObj.age) {
        filtGames = filtGames.filter((game) => game.ageRating <= +paramsObj.age);
      }
      return filtGames;
    };

    res.json(filterGamesByParams(params)).send();
  });

  app.put("/api/product", (req, res) => {
    const card = req.body;
    const game = gameDb.find((item) => item.id === +card.id);
    if (game) {
      const index = gameDb.indexOf(game);
      gameDb[index] = card;
      res.status(200).json(gameDb[index]).send();
    } else {
      res.status(201).send();
    }
  });

  app.delete("/api/product/:id", (req, res) => {
    const id = +req.params.id;
    if (gameDb.find((item) => item.id === id)) {
      res
        .status(200)
        .json(gameDb.filter((item) => item.id !== id))
        .send();
    } else {
      res.status(204).send();
    }
  });

  app.post("/api/product", (req, res) => {
    const game = req.body;
    const getNewId = () => {
      let id = -1;
      gameDb.forEach((game) => {
        if (+game.id > id) id = +game.id;
      });
      return id + 1;
    };
    if (game) {
      const newGame = { ...game, id: getNewId() };
      res.status(200).json(newGame).send();
      gameDb.push(newGame);
    } else {
      res.status(400).send();
    }
  });
});

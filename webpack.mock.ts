// eslint-disable-next-line import/no-extraneous-dependencies
import webpackMockServer from "webpack-mock-server";

export default webpackMockServer.add((app, helper) => {
  app.get("/api/getTopProducts", (_req, res) => {
    // const response = {
    //   id: helper.getUniqueIdInt(),
    //   randomInt: helper.getRandomInt(),
    //   lastDate: new Date(),
    // };

    const response = [
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
    ];

    res.json(response);
  });
  app.get("/api/search/:search", (_req, res) => {
    const data = [
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
    ];
    const response = [];
    data.forEach((item) => {
      if (item.title.toLowerCase().includes(_req.params.search.toLowerCase())) response.push(item);
    });

    res.json(response);
  });
  app.post("/testPostMock", (req, res) => {
    res.json({ body: req.body || null, success: true });
  });
});

const { Router } = require("express");
const { House, User, Review } = require("../db");
const { extraHouses, extraReviews } = require("../../extra-db/extra-db");

const router = Router();

// --- GET METHODS ---
router.get("/", async (req, res) => {
  const allHouses = await House.findAll({ include: [User, Review] });
  res.status(200).json(allHouses);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);

  try {
    const house = await House.findByPk(id, { include: [User, Review]});
    console.log(house);
    res.status(200).json(house);
  } catch (error) {
    console.log(error);
  }
});

// --- POST METHODS ---
router.post("/setowner", async (req, res) => {
  const { userId, houseId } = req.body;
  try {
    const house = await House.findByPk(houseId);
    await house.setUsers(userId);
    res.status(200).json(house);
  } catch (error) {
    console.log(error);
  }
});

router.post("/createhouse", async (req, res) => {
  const { city, country, rooms, bathrooms, maxpeople, allowpets, wifi, type } =
    req.body;
  const { userMail } = req.query;
  const { userId } = req.query;

  try {
    const newHouse = await House.create(req.body);
    if (userId) {
      newHouse.setUsers(userId);
    } else if (userMail) {
      const user = await User.findOne({ where: { mail: userMail } });
      newHouse.setUsers(user.id);
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/createhouse", async (req, res) => {
  const { city, country, rooms, bathrooms, maxpeople, allowpets, wifi, type } =
    req.body;
  const { userMail } = req.query;
  const { userId } = req.query;

  try {
    const newHouse = await House.create(req.body);
    if (userId) {
      newHouse.setUsers(userId);
    }

    res.status(201).json(newHouse);
  } catch (error) {
    console.log(error);
  }
});

router.post("/makeabook", async (req, res) => {

  const {newReserve, houseId} = req.body

  try {
    const house = await House.findByPk(houseId);

    if (!house.bookings) {await house.update({bookings: [newReserve]})
    } else {
      await house.update({bookings: [...house.bookings, newReserve]})
    }

    res.status(200).json(house)

  } catch (error) {
    console.log(error)
  }
})

// --- PUT METHODS ---

router.put("/edithouse/:id", async (req, res) => {
  const houseId = req.params.id;
  const { userId } = req.query;
  const {
    city,
    country,
    picture,
    rooms,
    bathrooms,
    maxpeople,
    allowpets,
    wifi,
    type,
    bookings,
  } = req.body;

  try {
    const house = await House.findByPk(houseId, { include: User });
    const owner = house.Users[0].id;

    if (userId !== owner) {
      res.status(200).json({
        msg: `The ID ${userId} is not the owner of the house with ID ${houseId}`,
      });
    } else {
      await house.update(req.body);
      res.status(200).json(house);
    }
  } catch (error) {
    console.log(error);
  }
});

// --- DELETE METHODS ---

router.delete("/deletehouse", async (req, res) => {
  const { houseId, userId } = req.body;
  try {
    const house = await House.findByPk(houseId, { include: User });
    const owner = house.Users[0].id;
    if (userId !== owner) {
      res.status(200).json({
        msg: `The ID ${userId} is not the owner of the house with ID ${houseId}`,
      });
    } else {
      await House.destroy({ where: { id: houseId } });
      res.status(200).json({ msg: `House with ID ${houseId} destroyed.` });
    }
  } catch (error) {
    console.log(error);
  }
});

// --- EXTRA TO FULL DB ---

router.post("/fulldb", async (req, res) => {

  try {
    let testuser = await User.create({mail: "user403@gmail.com", sub: 'sadasfasfj'})
    extraHouses(50).forEach(async (house) => {
      try {
        let finder = await House.findOne({ where: house });
        const { scores, city, country, rooms, bathrooms, maxpeople, allowpets, wifi, type } =
        req.body;

        if (!finder) {
          let newHouse = await House.create(house);

          extraReviews(Math.floor(Math.random() * 8) + 1).forEach(async (newReview) => {
            let review = await Review.create(newReview)
            await review.setUser(testuser.id)
            await review.setHouse(newHouse.id)
            await newHouse.update({ scores: [...newHouse.scores, newReview.rating] })
          }) 

        }
      } catch (error) {
        console.log(error)
      }
    });

    res.status(100).json({ msg: "Base de datos creada" });
  } catch (error) {
    res.status(400).json(error);
  }
});



module.exports = router;


// extraReviews(5).forEach(async (review) => )



//   try {
//     let testuser = await User.create({mail: "user403@gmail.com", sub: 'sadasfasfj'})
//     extraHouses(50).forEach(async (house) => {
//       try {
//         let finder = await House.findOne({ where: house });
//         const { scores, city, country, rooms, bathrooms, maxpeople, allowpets, wifi, type } =
//         req.body;
//         if (!finder) {

//           let newHouse = await House.create(house);
//           let review = await Review.create(getReview())
//           await review.setUser(testuser.id)
//           await review.setHouse(newHouse.id)
//         }
//       } catch (error) {
//         console.log(error)
//       }
//     });

//     res.status(200).json({ msg: "Base de datos creada" });
//   } catch (error) {
//     res.status(400).json(error);
//   }
// });
const { Router } = require("express");
const { getUser, createUser } = require("../controllers/user");

const { House, User, Review } = require("../db");

const router = Router();

router.get("/", async (req, res) => {
  //Este get va a recibir por body un mail y un password que va a contrastar con la bd para encontrar coincidencias
  const { mail, password } = req.body;
  try {
    const user = await getUser(mail, password);
    res.status(200).json(user);
  } catch (error) {
    res.status(401).json(error.message);
  }
});

router.get('/getuser', async (req,res) => {
  const {mail} = req.query
  try {
    const finder = await User.findOne({where: {mail: mail}})
    res.status(200).json(finder)
  } catch (error) {
    console.log(error)
  }
})

router.put('/addfavoritehouse', async (req, res) => {

  const {userId, houseId} = req.body

  try {
      const user = await User.findByPk(userId)

      if (user.favoriteshouses.some(house => house == houseId)) {
        res.status(200).json({msg: `he user ${userId} already have house ${houseId} in favorites.`})
      } else {
        user.update({favoriteshouses: [...user.favoriteshouses, houseId]})
        res.status(200).json({msg: `${houseId} house eliminated from ${userId} user favorites`})
      }

  } catch (error) {
      console.log(error)
  }

})

router.put('/deletefavoritehouse', async (req, res) => {

  const {userId, houseId} = req.body

  try {
      const user = await User.findByPk(userId)

      if (user.favoriteshouses.some(house => house == houseId)) {
        user.update({favoriteshouses: user.favoriteshouses.filter(house => house !== houseId)})
        res.status(200).json({msg: `eliminated.`})

      } else {
        res.status(200).json({msg: `no house with id ${houseId} in user ${userId}`})
      }

  } catch (error) {
      console.log(error)
  }

})

router.post("/", async (req, res) => {

  try {
    const newUser = await createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json(error.message);
  }
});


module.exports = router;


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

router.post("/", async (req, res) => {

  try {
    const newUser = await createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json(error.message);
  }
});


module.exports = router;


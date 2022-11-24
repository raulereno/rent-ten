const { Router } = require("express");
const { SendMail_verification } = require("../controllers/SendMail_verification")

const {
  getUser,
  createUser,
  updateProfilePicture,
} = require("../controllers/user");
const { House, User, Review, Booking } = require("../db");
const { transporter } = require("../../nodemailer/nodemailer");

const router = Router();

router.get("/", async (req, res) => {

  const { mail, password } = req.body;
  try {
    const user = await getUser(mail, password);
    res.status(200).json(user);
  } catch (error) {
    res.status(401).json(error.message);
  }
});


router.get("/getuser", async (req, res) => {
  const { mail } = req.query;
  try {
    const finder = await User.findOne({ where: { mail: mail }, include: [Review, House, Booking] })
    res.status(200).json(finder);
  } catch (error) {
    console.log(error);
  }
});

router.put("/addfavoritehouse", async (req, res) => {
  const { userId, houseId } = req.body;

  try {
    const user = await User.findByPk(userId);

    if (user.favoriteshouses.some((house) => house == houseId)) {
      res.status(200).json({
        msg: `he user ${userId} already have house ${houseId} in favorites.`,
      });
    } else {
      user.update({ favoriteshouses: [...user.favoriteshouses, houseId] });
      res.status(200).json({
        msg: `${houseId} house eliminated from ${userId} user favorites`,
      });
    }
  } catch (error) {
    console.log(error);
  }
});

router.put("/deletefavoritehouse", async (req, res) => {
  const { userId, houseId } = req.body;

  try {
    const user = await User.findByPk(userId);

    if (user.favoriteshouses.some((house) => house == houseId)) {
      user.update({
        favoriteshouses: user.favoriteshouses.filter(
          (house) => house !== houseId
        ),
      });
      res.status(200).json({ msg: `eliminated.` });
    } else {
      res
        .status(200)
        .json({ msg: `no house with id ${houseId} in user ${userId}` });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  const { mail } = req.body;

  try {
    const finder = await User.findOne({ where: { mail: mail } });

    if (!finder) {
      const newUser = await createUser(req.body);
      res.status(201).json(newUser);
    } else {
      res.status(201).json({ msg: "User already exist." });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
});

router.post("/requirecode/:mail", async (req, res) => {
  const mail = req.params.mail;
  const code = Math.random().toString(36).slice(4);

  try {
    // await transporter.sendMail({
    //   from: '"Verication email for your Rent-Ten account" "<Rent-Ten@rentten.com>"',
    //   to: mail,
    //   subject: "Verification code",
    //   html: `<h1> Hola, tu codigo para verificar tu mail en RentTen es: <b>${code}</b></h1>`,
    // });
    
    await SendMail_verification(mail, code)

    const user = await User.findOne({ where: { mail: mail } });
    await user.update({ verificationCode: code, verified: "pending" });

    res.status(200).json({ msg: `We send you a code verification to ${mail}` });
  } catch (error) {
    console.log(error);
  }
});

router.get("/verifymail/:mail", async (req, res) => {
  const code = req.query.code;
  const mail = req.params.mail;

  try {
    const user = await User.findOne({ where: { mail: mail } });

    if (user.verificationCode === code) {
      await user.update({ verified: "verified", code: "verified" });
      return res
        .status(200)
        .json({ msg: `Thanks, your account is now verified!` });
    } else {
      throw new Error({ msg: "Wrong verification code" });
    }
  } catch (error) {
    res.status(400).json({ msg: "Wrong verification code" });
  }
});

router.patch("/changepicture/:userID", async (req, res) => {
  const { userID } = req.params;
  const { newPicture, authID } = req.body;
  try {
    await updateProfilePicture(userID, newPicture, authID);
    res.status(202).json({ msg: "Profile picture updated" });
  } catch (error) {
    console.log(error.message);
    res
      .status(304)
      .json({ msg: "There was an error updating the profile picture" });
  }
});

router.put('/deleteAccount/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findOne({ where: { id: userId } });

    if (user.id === userId) {
      await user.update({ authorized: "not" });
      return res
        .status(200)
        .json({ msg: `Your account has been delete!` });
    } else {
      throw new Error({ msg: "Can't delete this account" });
    }
  } catch (error) {
    res.status(400).json({ msg: "Can't delete this account" });
  }
});

/* 
router.put('/deleteAccount', async (req, res) => {
  const { id } = req.body;

  try {
    const user = await User.findByPk(id);

    if (user.id === user) {
      user.update({ authorized: 'not' });
      res.status(200).json({ msg: `Your account has been delete` });
    } else {
      res
        .status(200)
        .json({ msg: `Your account has been delete` });
    }
  } catch (error) {
    console.log(error);
  }
});
*/

module.exports = router;

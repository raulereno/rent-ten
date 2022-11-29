const { Router } = require("express");
const { SendMail_question } = require("../controllers/SendMail_question");
const router = Router();

router.post("/sendQuestion", async (req, res) => {
  const { mail, message, subject } = req.body;

  try {
    await SendMail_question(req.body);
    console.log(req.body);
    res.status(200).json({ msg: `Email to rentten2022@gmail.com sended` });
  } catch (error) {}
});

module.exports = router;

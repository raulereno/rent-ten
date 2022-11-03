const { Router } = require("express");
const { addReview } = require("../controllers/reviews");
const { House, User, Review } = require("../db");

const router = Router();

router.get("/", async (req, res) => {
  const allReviews = await Review.findAll();
  res.json(allReviews);
});

router.post("/", async (req, res) => {
  try {
    const newReview = await addReview(req.body);

    res.status(201).json(newReview);
  } catch (error) {
    res.status(404).json(error.message);
  }
});

module.exports = router;

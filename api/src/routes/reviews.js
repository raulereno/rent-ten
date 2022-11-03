const { Router } = require("express");
const { addReview, getReviews } = require("../controllers/reviews");
const router = Router();

router.get("/", async (req, res) => {
  const { houseId } = req.body;
  try {
    const allReviews = await getReviews(houseId);
    res.status(200).json(allReviews);
  } catch (error) {
    res.status(400).json(error.message);
  }
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

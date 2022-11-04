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



router.get('/:houseId', async (req, res) => {

    const houseId = req.params.houseId

    try {
        const houseReviews = await Review.findAll({ where: { HouseId: houseId } })
        res.status(200).json(houseReviews)

    } catch (error) {
        console.log(error)
    }
})

router.post('/', async (req, res) => {
    const { opinion, rating, userId, houseId } = req.body

    try {
        const newReview = await Review.create({ opinion, rating })
        await newReview.setUser(userId)
        await newReview.setHouse(houseId)
        res.status(200).json(newReview)

    } catch (error) {
        console.log(error)
    }
})

router.delete('/', async (req, res) => {
    const { userId, reviewId } = req.body

    try {
        const review = await Review.findByPk(reviewId)
        const owner = review.UserId
        if (owner == userId) {
            await Review.destroy({ where: { id: reviewId } })
            return res.status(200).json({ msg: `Review with ID ${reviewId} deleted successfully.` })
        } else {
            return res.status(400).json({ msg: `The ID ${userId} is not the owner of the review with ID ${reviewId}` })
        }

    } catch (error) {
        console.log(error)
    }
})

module.exports = router;

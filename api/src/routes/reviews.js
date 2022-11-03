const { Router } = require('express');
const { House, User, Review } = require('../db');

const router = Router();

router.get('/', async (req, res) => {
    const allReviews = await Review.findAll()
    res.json(allReviews)
});

module.exports = router;
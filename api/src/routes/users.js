const { Router } = require('express');
const { House, User, Review } = require('../db');

const router = Router();

router.get('/', async (req, res) => {
    const allUsers = await User.findAll({include:House})
    res.json(allUsers)
});

module.exports = router;
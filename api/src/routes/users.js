const { Router } = require('express');
const { House, User, Review } = require('../db');

const router = Router();

router.get('/', async (req, res) => {
    const allUsers = await User.findAll({include:House})
    res.json(allUsers)
});


router.post('/newuser', async (req, res) => {
    const { name, lastname, mail, country, admin, favoriteshouses} = req.body
    try {
        const newUser = await User.create(req.body)
        res.status(200).json(newUser)
    } catch (error) {
        console.log(error)
    }
})
module.exports = router;


const { Router } = require('express');
const houses = require('./houses');
const users = require('./users');
const reviews = require('./reviews');
const router = Router();


router.use('/houses', houses);
router.use('/users', users);
router.use('/reviews', reviews);


module.exports = router;

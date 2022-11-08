const { Router } = require('express');
const { House, User, Review } = require('../db');
const { extraHouses } = require('../../extra-db/extra-db')

const router = Router();

// --- GET METHODS ---
router.get('/', async (req, res) => {
    const allHouses = await House.findAll({ include: User })
    res.status(200).json(allHouses)
});


router.get('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const house = await House.findByPk(id, { include: User })
        res.status(200).json(house)
    } catch (error) {
        console.log(error)
    }

})


// --- POST METHODS ---
router.post('/setowner', async (req, res) => {
    const { userId, houseId } = req.body
    try {
        const house = await House.findByPk(houseId)
        await house.setUsers(userId)
        res.status(200).json(house)
    } catch (error) {
        console.log(error)
    }
})

router.post('/createhouse', async (req, res) => {
    const { city, country, rooms, bathrooms, maxpeople, allowpets, wifi, type } = req.body
    const { userId } = req.query

    try {
        const newHouse = await House.create(req.body)
        if (userId) {
            newHouse.setUsers(userId)
        }

        res.status(201).json(newHouse)

    } catch (error) {
        console.log(error)
    }
})


// --- PUT METHODS ---

router.put('/edithouse/:id', async (req, res) => {

    const houseId = req.params.id
    const { userId } = req.query
    const { city, country, picture, rooms, bathrooms, maxpeople, allowpets, wifi, type } = req.body

    try {
        const house = await House.findByPk(houseId, { include: User })
        const owner = house.Users[0].id

        if (userId !== owner) {
            res.status(200).json({ msg: `The ID ${userId} is not the owner of the house with ID ${houseId}` })

        } else {
            await house.update(req.body)
            res.status(200).json(house)
        }

    } catch (error) {
        console.log(error)
    }

})


// --- DELETE METHODS ---

router.delete('/deletehouse', async (req, res) => {
    const { houseId, userId } = req.body
    try {
        const house = await House.findByPk(houseId, { include: User })
        const owner = house.Users[0].id
        if (userId !== owner) {
            res.status(200).json({ msg: `The ID ${userId} is not the owner of the house with ID ${houseId}` })
        } else {
            await House.destroy({ where: { id: houseId } })
            res.status(200).json({ msg: `House with ID ${houseId} destroyed.` })
        }
    } catch (error) {
        console.log(error)
    }
})


// --- EXTRA TO FULL DB ---

router.post('/fulldb', async (req, res) => {

    try {
        extraHouses.forEach(async house => {
            let finder = await House.findOne({ where: house })
            if (!finder) { await House.create(house) }
            })
            
        res.status(200).json({msg: "Base de datos creada"})

    } catch (error) {
        res.status(400).json(error)
    }
})
module.exports = router;
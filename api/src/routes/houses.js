const { Router } = require('express');
const { House, User, Review } = require('../db');

const router = Router();

router.get('/', async (req, res) => {
    const allHouses = await House.findAll({include:User})
    res.json(allHouses)
});

router.post('/createhouse', async (req, res) => {
   const {city, country, rooms, bathrooms, maxpeople, allowpets, wifi, type} = req.body

   try {
    const newHouse = await House.create(req.body)
    res.status(201).json(newHouse)

   } catch (error) {
    console.log(error)
   }
})

module.exports = router;




// id: {
//     type: DataTypes.UUID,
//     allowNull: false,
//     primaryKey: true,
//     defaultValue: DataTypes.UUIDV4
// },

// city: {
//     type: DataTypes.STRING,
//     allowNull: true,
//     defaultValue: "Argentina",
// },

// country: {
//     type: DataTypes.STRING,
//     allowNull: true,
//     defaultValue: "Argentina",
// },

// rooms: {
//     type: DataTypes.INTEGER,
//     allowNull: true,
//     defaultValue: 1,
// },

// bathrooms: {
//     type: DataTypes.INTEGER,
//     allowNull: true,
//     defaultValue: 1,
// },

// maxpeople: {
//     type: DataTypes.INTEGER,
//     allowNull: true,
//     defaultValue: 1,
// },

// allowpets: {
//     type: DataTypes.BOOLEAN,
//     allowNull: true,
//     defaultValue: false,
// },

// wifi: {
//     type: DataTypes.BOOLEAN,
//     allowNull: true,
//     defaultValue: false,
// },

// type: {
//     type: DataTypes.ENUM('departament', 'guest house', 'house', 'hotel'),
//     allowNull: true,                
// },
const { countries, photos, booleans, houseTypes, adresses, cities, opinions } = require('./data')

function getRandomArbitrary(max, min) {
    return Math.floor(Math.random() * (max - min) + min)
  }

const randomDate = () =>  {
    let year = ['2022', '2021'][Math.floor(Math.random() * 2)]
    let month = (Math.floor(Math.random() * 11) + 1).toString()
    let day = (Math.floor(Math.random() * 30) + 1).toString()
    let month_end = getRandomArbitrary(month, 13)
    let day_end = getRandomArbitrary(day, 31)

    return {
        "start": `${year}-${month}-${day}`,
        "end": `${year}-${month_end}-${day_end}` }
    }

const newHouse = () => {

    return {
    city: cities[Math.floor(Math.random() * cities.length)],
    country: countries[Math.floor(Math.random() * countries.length)],
    picture: [...Array(4).keys()].map(() => Math.floor(Math.random() * photos.length)).map((i) => photos[i]),
    rooms: getRandomArbitrary(1,6),
    bathrooms: getRandomArbitrary(1,4),
    allowpets: booleans[Math.floor(Math.random() * 2)],
    wifi: booleans[Math.floor(Math.random() * 2)],
    type: houseTypes[Math.floor(Math.random() * houseTypes.length)],
    price: getRandomArbitrary(50,501),
    address: adresses[Math.floor(Math.random() * adresses.length)] + ' ' + Math.floor(Math.random() * 500),
    bookings: [...Array(getRandomArbitrary(2,5)).keys()].map(() => randomDate())}
} 

const extraHouses = (n) => {
    return [...Array(n).keys()].map(() => newHouse())
}

const getReview = () => {
    return {
        opinion: opinions[Math.floor(Math.random() * opinions.length)],
        rating: Math.floor(Math.random() * 4) + 1,
        userEmail: "User" + Math.floor(Math.random() * 535) + "@mail.com",
        }
}

// let extraHouses = [...Array(50).keys()].map(() => newHouse())

module.exports = {extraHouses, getReview}


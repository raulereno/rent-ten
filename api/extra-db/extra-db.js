let extraHouses = [

    {
        city: "Buenos Aires",
        country: "Argentina",
        picture: ['https://images.adsttc.com/media/images/629f/3517/c372/5201/650f/1c7f/newsletter/hyde-park-house-robeson-architects_1.jpg?1654601149', 'https://images.adsttc.com/media/images/5ecd/d4ac/b357/65c6/7300/009d/large_jpg/02C.jpg?1590547607'],
        rooms: 3,
        bathrooms: 2,
        allowpets: true,
        wifi: true,
        type: 'house'
    },

    {
        city: "Bogota",
        country: "Colombia",
        picture: ['https://images.adsttc.com/media/images/5ecd/d4ac/b357/65c6/7300/009d/large_jpg/02C.jpg?1590547607', 'https://images.adsttc.com/media/images/629f/3517/c372/5201/650f/1c7f/newsletter/hyde-park-house-robeson-architects_1.jpg?1654601149'],
        rooms: 2,
        bathrooms: 1,
        allowpets: false,
        wifi: false,
        type: 'guest house'
    },

    {
        city: "Lima",
        country: "Peru",
        picture: ['https://dnm.nflximg.net/api/v6/BvVbc2Wxr2w6QuoANoSpJKEIWjQ/AAAAQZUkwT6XhdDnNqAsPrZiQWWHvhpJo0cviRndWweNeFE0G6sOOa7ltzrwXSocCIsqRqAcruHZtEk-MBx_qLAJz-43yAbJAJXmEYKEMD78GRjJ3ro5x5T97jaAj0NwMiaHvO4mNGLRmwNAPE2yA0LWWV1UfQI.jpg?r=48b', 'https://images.adsttc.com/media/images/5ecd/d4ac/b357/65c6/7300/009d/large_jpg/02C.jpg?1590547607'],
        rooms: 3,
        bathrooms: 2,
        allowpets: true,
        wifi: true,
        type: 'hotel'
    },

    {
        city: "Tulum",
        country: "Mexico",
        picture: ['https://dnm.nflximg.net/api/v6/BvVbc2Wxr2w6QuoANoSpJKEIWjQ/AAAAQZUkwT6XhdDnNqAsPrZiQWWHvhpJo0cviRndWweNeFE0G6sOOa7ltzrwXSocCIsqRqAcruHZtEk-MBx_qLAJz-43yAbJAJXmEYKEMD78GRjJ3ro5x5T97jaAj0NwMiaHvO4mNGLRmwNAPE2yA0LWWV1UfQI.jpg?r=48b', 'https://static01.nyt.com/images/2019/06/25/realestate/25domestic-zeff/a1c1a1a36c9e4ff8adcb958c4276f28d-jumbo.jpg'],
        rooms: 5,
        bathrooms: 1,
        allowpets: true,
        wifi: true,
        type: 'department'
    },

    {
        city: "Buenos Aires",
        country: "Argentina",
        picture: ['https://images.adsttc.com/media/images/629f/3517/c372/5201/650f/1c7f/newsletter/hyde-park-house-robeson-architects_1.jpg?1654601149', 'https://static01.nyt.com/images/2019/06/25/realestate/25domestic-zeff/a1c1a1a36c9e4ff8adcb958c4276f28d-jumbo.jpg'],
        rooms: 1,
        bathrooms: 1,
        allowpets: false,
        wifi: true,
        type: 'hotel'
    },

    {
        city: "Santiago",
        country: "Chile",
        picture: ['https://images.adsttc.com/media/images/5ecd/d4ac/b357/65c6/7300/009d/large_jpg/02C.jpg?1590547607', 'https://static01.nyt.com/images/2019/06/25/realestate/25domestic-zeff/a1c1a1a36c9e4ff8adcb958c4276f28d-jumbo.jpg'],
        rooms: 2,
        bathrooms: 2,
        allowpets: true,
        wifi: true,
        type: 'house'
    },

]

module.exports = {
    extraHouses
}


//            type: DataTypes.ENUM('department', 'guest house', 'house', 'hotel'),
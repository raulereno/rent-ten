let extraHouses = [

    {
        city: "Buenos Aires",
        country: "Argentina",
        picture: ['https://images.adsttc.com/media/images/629f/3517/c372/5201/650f/1c7f/newsletter/hyde-park-house-robeson-architects_1.jpg?1654601149', 'https://images.adsttc.com/media/images/5ecd/d4ac/b357/65c6/7300/009d/large_jpg/02C.jpg?1590547607'],
        rooms: 3,
        bathrooms: 2,
        allowpets: true,
        wifi: true,
        type: 'house',
        price: 200,
        address: "San Martin 494",
        bookings: [
            {
                "start": "2022-11-01",
                "end": "2022-11-07"
            },
            {
                "start": "2022-11-11",
                "end": "2022-11-17"
            }
        ]
    },

    {
        city: "Bogota",
        country: "Colombia",
        picture: ['https://images.adsttc.com/media/images/5ecd/d4ac/b357/65c6/7300/009d/large_jpg/02C.jpg?1590547607', 'https://images.adsttc.com/media/images/629f/3517/c372/5201/650f/1c7f/newsletter/hyde-park-house-robeson-architects_1.jpg?1654601149'],
        rooms: 2,
        bathrooms: 1,
        allowpets: false,
        wifi: false,
        type: 'guest house',
        price: 100,
        address: "Gerardito 94",
        bookings: [
            {
                "start": "2022-11-01",
                "end": "2022-11-30"
            },
            {
                "start": "2022-12-15",
                "end": "2022-12-30"
            }
        ]
    },

    {
        city: "Lima",
        country: "Peru",
        picture: ['https://dnm.nflximg.net/api/v6/BvVbc2Wxr2w6QuoANoSpJKEIWjQ/AAAAQZUkwT6XhdDnNqAsPrZiQWWHvhpJo0cviRndWweNeFE0G6sOOa7ltzrwXSocCIsqRqAcruHZtEk-MBx_qLAJz-43yAbJAJXmEYKEMD78GRjJ3ro5x5T97jaAj0NwMiaHvO4mNGLRmwNAPE2yA0LWWV1UfQI.jpg?r=48b', 'https://images.adsttc.com/media/images/5ecd/d4ac/b357/65c6/7300/009d/large_jpg/02C.jpg?1590547607'],
        rooms: 3,
        bathrooms: 2,
        allowpets: true,
        wifi: true,
        type: 'hotel',
        price: 50,
        address: "Gustavo Rolon 20",
        bookings: [
            {
                "start": "2022-11-01",
                "end": "2022-11-07"
            },
            {
                "start": "2022-11-15",
                "end": "2022-11-20"
            }
        ]
    },

    {
        city: "Tulum",
        country: "Mexico",
        picture: ['https://dnm.nflximg.net/api/v6/BvVbc2Wxr2w6QuoANoSpJKEIWjQ/AAAAQZUkwT6XhdDnNqAsPrZiQWWHvhpJo0cviRndWweNeFE0G6sOOa7ltzrwXSocCIsqRqAcruHZtEk-MBx_qLAJz-43yAbJAJXmEYKEMD78GRjJ3ro5x5T97jaAj0NwMiaHvO4mNGLRmwNAPE2yA0LWWV1UfQI.jpg?r=48b', 'https://static01.nyt.com/images/2019/06/25/realestate/25domestic-zeff/a1c1a1a36c9e4ff8adcb958c4276f28d-jumbo.jpg'],
        rooms: 5,
        bathrooms: 1,
        allowpets: true,
        wifi: true,
        type: 'department',
        price: 175,
        address: "San Luis 2024",
        bookings: [
            {
                "start": "2022-11-15",
                "end": "2022-11-30"
            },
            {
                "start": "2022-11-03",
                "end": "2022-11-08"
            }
        ]
    },

    {
        city: "Buenos Aires",
        country: "Argentina",
        picture: ['https://images.adsttc.com/media/images/629f/3517/c372/5201/650f/1c7f/newsletter/hyde-park-house-robeson-architects_1.jpg?1654601149', 'https://static01.nyt.com/images/2019/06/25/realestate/25domestic-zeff/a1c1a1a36c9e4ff8adcb958c4276f28d-jumbo.jpg'],
        rooms: 1,
        bathrooms: 1,
        allowpets: false,
        wifi: true,
        type: 'hotel',
        price: 80,
        address: "Av Belgrano 3494",
        bookings: [
            {
                "start": "2022-11-11",
                "end": "2022-11-15"
            },
            {
                "start": "2022-12-01",
                "end": "2022-12-15"
            }
        ]
    },

    {
        city: "Santiago",
        country: "Chile",
        picture: ['https://images.adsttc.com/media/images/5ecd/d4ac/b357/65c6/7300/009d/large_jpg/02C.jpg?1590547607', 'https://static01.nyt.com/images/2019/06/25/realestate/25domestic-zeff/a1c1a1a36c9e4ff8adcb958c4276f28d-jumbo.jpg'],
        rooms: 2,
        bathrooms: 2,
        allowpets: true,
        wifi: true,
        type: 'house',
        price: 120,
        address: "Calle Santiago 4344",
        bookings: [
            {
                "start": "2022-11-01",
                "end": "2022-11-07"
            },
            {
                "start": "2022-11-11",
                "end": "2022-11-17"
            }
        ]
    },

]

module.exports = {
    extraHouses
}


//            type: DataTypes.ENUM('department', 'guest house', 'house', 'hotel'),
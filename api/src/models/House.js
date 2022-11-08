const {DataTypes} = require('sequelize');


module.exports = (sequelize) => {

    sequelize.define('House', {

        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },

        city: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "Argentina",
        },

        country: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "Argentina",
        },

        address: {
            type:DataTypes.TEXT,
            allowNull: true,
        },

        picture: {
            type: DataTypes.ARRAY(DataTypes.TEXT),
            allowNull: true,
            defaultValue: ['https://ateamymm.ca/defaulthouse.jpg']
        },

        rooms: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 1,
        },

        bathrooms: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 1,
        },

        maxpeople: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 1,
        },

        allowpets: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },

        wifi: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },

        type: {
            type: DataTypes.ENUM('department', 'guest house', 'house', 'hotel'),
            allowNull: true,                
        },
        
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },

        bookings: {
            type: DataTypes.ARRAY(DataTypes.JSON),
            allowNull: true
        }
    },

    {
        timestamps: false,
    })
}

// {
//     id: number
//     owner: object{}
//     city: string
//     country: string
//     rooms: number;
//     maxPeople: number;
//     allowPets: boolean;
//     bathrooms: number;
//     wifi: boolean;
//     type: ENUM ['departament', 'guest house', 'house', 'hotel']
//     reviews: [{
//                 id: 
//                 user: 
//                 review: 
//                 rating: }]
//     reserved: [{
//                 by: (id_user)
//                 from: date 
//                 to: date
//                 }];
//     }
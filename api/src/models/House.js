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
            type: DataTypes.ENUM('departament', 'guest house', 'house', 'hotel'),
            allowNull: true,                
        },
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
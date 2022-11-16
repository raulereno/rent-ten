const { DataTypes } = require('sequelize');



module.exports = (sequelize) => {

    sequelize.define('Review', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,

        },

        opinion: {
            type: DataTypes.TEXT,
            allowNull: true,
        },

        rating: {
            type: DataTypes.ENUM('1', '2', '3', '4', '5'),
            allowNull: false,
        },
        
        userEmail: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }
    )
}


//     reviews: [{
//                 id: 
//                 user: 
//                 review: 
//                 rating: }]
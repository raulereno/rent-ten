const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {

    sequelize.define('Booking', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },

        start: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        end: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        
        code: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'pending'
        },
    }
    )
}
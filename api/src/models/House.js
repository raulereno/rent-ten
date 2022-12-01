const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "House",
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
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
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: "Fake Street 1024"
      },

      picture: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        allowNull: true,
        defaultValue: ["https://ateamymm.ca/defaulthouse.jpg"],
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
    },

    pending_bookings: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: true
    },

    scores: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: true,
      defaultValue: []
    },

    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },

    rating: {
      type: DataTypes.VIRTUAL,
      get() {
        if (this.scores) {
          let sum = 0;
          this.scores.forEach(n => sum += n)
          return  Math.ceil(sum / this.scores.length)
        } else {
          return 1
        }
       
      },
      set(value) {
        throw new Error('Do not try to set the `rating` value, its a virtual DataType!');
      },
      allowNull: true,
      defaultValue: 1
    },

    price_quality_relation: {
      type: DataTypes.VIRTUAL,
      get() {
        return Math.ceil(this.price / this.rating)
      },
      set(value) {
        throw new Error('Do not try to set the `rating` value, its a virtual DataType!');
      },
      allowNull: true
    }

    },

    {
      timestamps: false,
    }
  );
};
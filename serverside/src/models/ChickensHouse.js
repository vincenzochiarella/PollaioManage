const Sequelize = require("sequelize");
const db = require("../db/db")


var ChickensHouse = db.sequelize.define('ChickensHouse',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
        },
        latitude: {
            type: Sequelize.FLOAT,
        },
        longitude: {
            type: Sequelize.FLOAT,
        },
        doorStatus: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        sun: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        luminosity: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        lumSensibility: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        lumMin: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
        
    },
    {
        timestamps: false
    }
)



module.exports = ChickensHouse
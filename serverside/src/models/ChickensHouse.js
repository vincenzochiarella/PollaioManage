const Sequelize = require("sequelize");
const db = require("../db/db")
const SunMoovement = require("./SunMoovement")
const Temperatures = require("./Temperatures")
const Access = require("./Access")

var ChickensHouse = db.sequelize.define('ChickensHouse',
    {
        idChickenHouse: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        owner: {
            type: Sequelize.STRING,
        },
        latitude:{
            type: Sequelize.FLOAT,
        },
        longitude:{
            type: Sequelize.FLOAT,
        },
        ipCamere: {
            type: Sequelize.STRING
        },
        doorStatus: {
            type: Sequelize.INTEGER
        }
    },
    {
        timestamps: false
    }
);
ChickensHouse.hasMany(SunMoovement)
ChickensHouse.hasMany(Temperatures)
ChickensHouse.hasMany(Access)

module.exports = ChickensHouse
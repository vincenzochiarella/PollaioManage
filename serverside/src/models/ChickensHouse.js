const Sequelize = require("sequelize");
const db = require("../db/db")
const SunMoovement = require("./SunMoovement")
const Temperatures = require("./Temperatures")

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
        latitude:{
            type: Sequelize.FLOAT,
        },
        longitude:{
            type: Sequelize.FLOAT,
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


module.exports = ChickensHouse
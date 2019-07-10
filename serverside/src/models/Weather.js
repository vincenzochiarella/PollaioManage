const Sequelize = require("sequelize")
const db = require('../db/db')

var Weather = db.sequelize.define("weather",
    {
        date: {
            type: Sequelize.TEXT,
            primaryKey: true,
            allowNull: false        
        },
        time: {
            type: Sequelize.TIME,
            primaryKey: true,
            allowNull : false
        },
        temps:{
            type: Sequelize.FLOAT,
            allowNull: false
        },
        pressure:{
            type: Sequelize.FLOAT,
            allowNull: false
        },
        humidity:{
            type: Sequelize.FLOAT,
            allowNull: false
        },
        clouds:{
            type: Sequelize.INTEGER
        },
        iconCode:{
            type: Sequelize.TEXT
        }

    },
    {
        timestamps: false
    }
);

module.exports = Weather
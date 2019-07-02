const Sequelize = require("sequelize")
const db = require('../db/db')

var Temperatures = db.sequelize.define("temperatures",
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
            type: Sequelize.INTEGER,
            allowNull: false
        }
    },
    {
        timestamps: false
    }
);

module.exports = Temperatures
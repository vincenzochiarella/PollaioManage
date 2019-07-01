const Sequelize = require("sequelize")
const db = require('../db/db')

var Temperatures = db.sequelize.define("temperatures",
    {
        date_time: {
            type: Sequelize.DATE,
            primaryKey: true
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
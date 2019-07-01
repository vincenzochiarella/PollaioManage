const Sequelize = require("sequelize")
const db = require('../db/db')
var SunMoovement = db.sequelize.define("sunmoovement",
    {
        day: {
            type: Sequelize.DATEONLY,
            primaryKey: true,
            allowNull: false
        },
        sunrise: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        sunset: {
            type: Sequelize.TEXT,
            allowNull: false
        }
    },
    {
        timestamps: false
    }
);

module.exports = SunMoovement
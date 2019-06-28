const Sequelize = require("sequelize")
const db = require('../db/db')
var SunMoovement = db.sequelize.define("sunmoovement",
    {
        dateSunMoovement: {
            type: Sequelize.DATEONLY,
            primaryKey: true
        },
        sunrise: {
            type: Sequelize.TIME,
            allowNull: false
        },
        sunset: {
            type: Sequelize.TIME,
            allowNull: false
        }
    },
    {
        timestamps: false
    }
);

module.exports = SunMoovement
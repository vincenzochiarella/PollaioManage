const Sequelize = require("sequelize")
const db = require('../db/db')
var SunMoovement = db.sequelize.define("sunmoovement",
    {
        dateSunMoovement: {
            type: Sequelize.DATEONLY,
            primaryKey: true,
            autoIncrement: true
        },
        sunrise: {
            type: Sequelize.TIME,
            allowNull: false
        },
        sunset: {
            type: Sequelize.TIME,
            allowNull: false
        },
        chickenshouse_idchickenshouse: {
            type: Sequelize.INTEGER,
            references: 'Chickenshouse', //tabella
            referencesKey: 'idchickenshouse'
        }

    },
    {
        timestamps: false
    }
);

module.exports = SunMoovement
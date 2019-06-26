const Sequelize = require("sequelize")
const db = require('../db/db')

var Temperatures = db.sequelize.define("temperatures",
    {
        dateSunMoovement: {
            type: Sequelize.DATE,
            primaryKey: true,
            autoIncrement: true
        },
        sunrise:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        chickenshouse_idchickenshouse:{
            type: Sequelize.INTEGER,
            references: 'Chickenshouse', //tabella
            referencesKey: 'idchickenshouse'
        }

    },
    {
        timestamps: false
    }
);

module.exports = Temperatures
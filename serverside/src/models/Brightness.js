const Sequelize = require('sequelize')
const db = require("../db/db")

var Brightness = db.sequelize.define('Brightness',
{
    value: {
        type: Sequelize.FLOAT
    }
})

module.exports = Brightness
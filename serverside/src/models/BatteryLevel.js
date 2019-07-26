const Sequelize = require('sequelize')
const db = require('../db/db')

var BatteryLevel = db.sequelize.define('BatteryLevel',
{
    value: {
        type: Sequelize.FLOAT
    }
})

module.exports = BatteryLevel
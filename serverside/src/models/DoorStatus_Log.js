const Sequelize = require("sequelize")
const db = require('../db/db')
var DoorStatus_Logs = db.sequelize.define("log_doorstatus",
    {
        date_time: {
            type: Sequelize.DATE,
            primaryKey: true
        },
        before_status: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        next_status: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    },
    {
        timestamps: false
    }
);

module.exports = DoorStatus_Logs
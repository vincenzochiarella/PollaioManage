const Sequelize = require("sequelize")
const db = require('../db/db')
var Jobs = db.sequelize.define("Jobs",
    {
        date: {
            type: Sequelize.DATE,
            allowNull: false
        },
        move: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        status: {
            type: Sequelize.INTEGER
        }
    }
);


module.exports = Jobs
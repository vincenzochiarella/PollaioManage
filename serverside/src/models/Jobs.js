const Sequelize = require("sequelize")
const db = require('../db/db')
var Jobs = db.sequelize.define("Jobs",
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true
        },
        date: {
            primaryKey: true,
            type: Sequelize.DATE,
            allowNull: false
        },
        move: {
            primaryKey: true,
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }
);


module.exports = Jobs
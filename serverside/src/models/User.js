const Sequelize = require("sequelize")
const db = require("../db/db")
const Access = require ("./Access")

var User = db.sequelize.define(
    'user',
    {
        idUser: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        }
    },
    {
        timestamps: false
    }
)
User.hasMany(Access)
module.exports = User
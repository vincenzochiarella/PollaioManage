const Sequelize = require("sequelize")
const db = require("../db/db")

var Access = db.sequelize.define('Access',
    {
        idAccess:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_idUser:{
            type: Sequelize.INTEGER,
            reference: 'users',
            referenceKey: 'idUser'
        },
        chickenshouse_idChickenshouse: {
            type: Sequelize.INTEGER,
            reference: 'Chickenshouse',
            referenceKey: 'idchickenshouse'
        }
    },
    {
        timestamps: false
    }
);


module.exports = Access


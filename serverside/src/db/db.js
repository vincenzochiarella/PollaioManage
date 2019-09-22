const Sequelize = require("sequelize");

const db = {}
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: './src/db/pollaiodb1.sqlite3',
    pool: {
        max: 7,
        min: 0,
        aquire: 30000,
        idle: 10000
    },
    logging: false

})

db.sequelize = sequelize
db.Sequelize = Sequelize

db.sequelize.sync().then(() => console.log("Db ready"))

module.exports = db
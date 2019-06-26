const Sequelize = require("sequelize");
const db = {}
const sequelize = new Sequelize("mydb","root","Ilmiopollaio19*", {
    dialect: "mysql",
    host: 'localhost',
    operatorAliases: false,
    pool: {
        max: 7,
        min: 0,
        aquire: 30000,
        idle: 10000
    }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

db.sequelize.sync().then(() => console.log("Db ready"))

module.exports = db
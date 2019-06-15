const Sequelize = require("sequelize");
const db = {

}
const sequelize = new Sequelize("mydb","root","Pollaio2019*", "",{
    host: 'localhost',
    dialect: 'mysql',
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

module.exports = db
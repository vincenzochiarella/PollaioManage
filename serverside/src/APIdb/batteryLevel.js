const express = require('express')
const PostRoutes = express.Router()
const cors = require('cors')
const BatteryLevel = require('../models/BatteryLevel')
PostRoutes.use(cors())

PostRoutes.post('/create', (req, res) => {
    BatteryLevel.create({
        value: req.body.value
    }).then(() => res.sendStatus(200))
        .catch(() => {
            res.sendStatus(400)
        })
})
/*TODO: check battery level history usage*/
// PostRoutes.post('/getlimited', (req, res) => {
//     BatteryLevel.findAll({
//         limit: req.body.limit,
//         order: [
//             ['createdAt', 'DESC']
//         ]
//     }).then(data => {
//         res.send(data)
//     }).catch(err => res.sendStatus(401))
// })

PostRoutes.post('/getlast', (req, res) => {
    BatteryLevel.findOne({
        limit: 1,
        order: [
            ['createdAt', 'DESC']
        ]
    }).then(data => {
        res.send(data)
    }).catch(err => res.sendStatus(401))
})

/**
 * 
 * @param {integer} value Set new percentage of battery
 */
function constructorBatteryLevel(value) {
    return new Promise((res, rej) => {
        BatteryLevel.create({
            value: value
        })
            .then((data) => res(JSON.parse(data)))
            .catch((err) => rej(err))
    })
}

function getCurrentBatteryLevel() {
    return new Promise((res,rej)=>{
        BatteryLevel.findOne({
            limit: 1,
            order: [
                ['createdAt', 'DESC']
            ]
        })
        .then(data => res(JSON.parse(data)))
        .catch(err => res(err))
    })
}
module.exports.routes = PostRoutes
module.exports.dbRequest = {
    constructorBatteryLevel,
    getCurrentBatteryLevel    
}
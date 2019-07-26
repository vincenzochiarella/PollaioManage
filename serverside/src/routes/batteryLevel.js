const express = require('express')
const battery = express.Router()
const cors = require('cors')
const BatteryLevel = require('../models/BatteryLevel')
battery.use(cors())

battery.post('/create', (req, res) => {
    BatteryLevel.create({
        value: req.body.value
    }).then(() => res.sendStatus(200))
        .catch(() => {
            res.sendStatus(400)
        })
})

battery.post('/getlimited', (req, res) => {
    BatteryLevel.findAll({
        limit: req.body.limit,
        order: [
            ['createdAt', 'DESC']
        ]
    }).then(data => {
        res.send(data)
    }).catch(err => res.sendStatus(401))
})

battery.post('/getlast', (req, res) => {
    BatteryLevel.findAll({
        limit: 1,
        order: [
            ['createdAt', 'ASC']
        ]
    }).then(data => {
        res.send(data)
    }).catch(err => res.sendStatus(401))
})

module.exports = battery
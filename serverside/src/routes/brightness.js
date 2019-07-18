const express = require('express')
const bright = express.Router()
const cors = require('cors')
const sequelize = require('sequelize')

const Brightness = require('../models/Brightness')
bright.use(cors())

bright.post('/create',(req, res) => {
    Brightness.create({
        value: req.body.value
    }).then(()=> res.sendStatus(200))
    .catch(() => {
        res.sendStatus(400)
    })
})

bright.post('/getlimited',(req, res)=>{
    Brightness.findAll({
        limit: req.body.limit,
        order: [
            ['createdAt','DESC']
        ]
    }).then(data=>{
        res.send(data)
    }).catch(err=> res.sendStatus(401))
})

module.exports = bright
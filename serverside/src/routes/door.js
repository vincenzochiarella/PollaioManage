const express = require("express")
const door = express.Router()
const cors = require('cors')


const DoorStatus_Log = require('../models/DoorStatus_Log')


door.use(cors())



door.post('/open', (req, res) => {
    //crea il log e lancia il comando di apertura
    DoorStatus_Log.create({
        user_authorized: req.body.user,
        movement: 1
    })
    var Controller = require('../DoorController')
    Controller.open()
})
door.post('/close', (req, res) => {
    //crea il log e lancia il comando di chiusura
    DoorStatus_Log.create({
        user_authorized: req.body.user,
        movement: 0
    })
    var Controller = require('../DoorController')
    Controller.close()
})

module.exports = door
const express = require("express")
const door = express.Router()
const cors = require('cors')


const DoorStatus_Log = require('../models/DoorStatus_Log')


door.use(cors())



door.post('/open', (req, res) => {
    var Controller = require('../DoorController')
    Controller.open( req.body.user )
    res.sendStatus(200)
})
door.post('/close', (req, res) => {
    var Controller = require('../DoorController')
    Controller.close(  req.body.user )
    res.sendStatus(200)
})

module.exports = door
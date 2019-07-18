const express = require("express")
const door = express.Router()
const cors = require('cors')


const DoorStatus_Log = require('../models/DoorStatus_Log')
const Door = require('../routine/Automatization')

door.use(cors())



door.post('/open',(req,res)=>{
    DoorStatus_Log.create({
        user_authorized: req.body.user,
        movement: 1
    })
    Door.moveDoor(1)

})
door.post('/close',(req,res)=>{
    DoorStatus_Log.create({
        user_authorized: req.body.user,
        movement: 0
    })
    Door.moveDoor(0)
})

module.exports = door
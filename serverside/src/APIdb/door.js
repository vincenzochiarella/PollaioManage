const express = require("express")
const PostRoutes = express.Router()
const cors = require('cors')


const DoorStatus_Log = require('../models/DoorStatus_Log')


PostRoutes.use(cors())



PostRoutes.post('/open', (req, res) => {
    openDoor(req.body.user)
    res.sendStatus(200)
})
PostRoutes.post('/close', (req, res) => {
    closeDoor(req.body.user)
    res.sendStatus(200)
})
/**
 * 
 * @param {string} user User who had activate movement
 */
function openDoor( user ) {
    var Controller = require('../DoorController')
    Controller.open( user )
}
/**
 * 
 * @param {string} user User who had activate movement
 */
function closeDoor( user ){
    var Controller = require('../DoorController')
    Controller.close( user )
}
module.exports.routes = PostRoutes
module.exports.dbRequest = {
    openDoor,
    closeDoor
}
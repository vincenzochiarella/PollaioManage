const express = require("express")
const chickenhouse = express.Router()
const cors = require('cors')

const SunMoovement = require("../models/SunMoovement")
const ChickensHouse = require('../models/ChickensHouse')
const Temperatures = require('../models/Temperatures')


chickenhouse.use(cors())
//crea un nuovo pollaio 
chickenhouse.post('/new', (req, res) => {
    ChickensHouse.create({
        name: req.body.name,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        doorStatus: req.body.doorStatus
    }).then(data => res.json(data))
        .catch(err => res.status(500))
})

chickenhouse.post('/getdoorstatus', (req, res) => {
    ChickensHouse.findOne({
        attributes: ['doorStatus']
    }).then((data) => {
        res.json(data)
    }).catch(err =>
        res.status(404))
})
chickenhouse.post('/getcoords', (req, res) => {
    ChickensHouse.findOne({
        attributes: ['latitude','longitude']
    }).then((data) => {
        res.json(data)
    }).catch(err =>
        res.status(404))
})




//richiedere le prime sette date con relativi orari
chickenhouse.post('/getsunmoovement', (req, res) => {

    SunMoovement.findAll().then((dates) => {
        res.json(dates)
    })
})
//aggiornare la lista presente sul db delle date
chickenhouse.post('/setsunmoovement', (req, res) => {
    const data = {
        day: req.body.day,
        sunrise: req.body.sunrise,
        sunset: req.body.sunset
    }
    SunMoovement.findOne({
        where: {
            day: data.day
        }
    }).then(sMoove => {
        if (!sMoove) {
            SunMoovement.create(data)
                .then(data => res.json({ day: data.day, sunrise: data.sunrise, sunset: data.susunset }))
                .catch(err => {
                    res.send(err)
                })
        }
    })
})
chickenhouse.post('/setTemp', (req, res) => {
    const temp = {
        date: req.body.date,
        time: req.body.time,
        temps: req.body.temperature
    }
    Temperatures.create(temp)
        .then(data => res.json({
            date: data.date,
            time: data.time,
            temp: data.temps
        }))
        .catch(err => res.send(err))
})

chickenhouse.post('/getTemp', (req, res) => {
    Temperatures.findAll({
        where: {
            date: req.body.date
        },
        attributes: ['time','temps']
    }).then(data =>
        res.json(data))
        .catch(err => res.send(err))
})
module.exports = chickenhouse
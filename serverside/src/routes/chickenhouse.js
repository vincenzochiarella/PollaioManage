const express = require("express")
const chickenhouse = express.Router()
const cors = require('cors')

const SunMoovement = require("../models/SunMoovement")
const ChickensHouse = require('../models/ChickensHouse')
const Weather = require('../models/Weather')


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
        res.send(err))

})
chickenhouse.post('/setdoorstatus', (req, res) => {
    ChickensHouse.update({
        doorStatus: req.body.doorStatus
    }, {
        where: {
            id: 1
        }
        }).then(() =>{
            res.sendStatus(200)
        })
})
chickenhouse.post('/getcoords', (req, res) => {
    ChickensHouse.findOne({
        attributes: ['latitude', 'longitude']
    }).then((data) => {
        res.json(data)
    }).catch(err =>
        res.send(err))

})
chickenhouse.post('/setcoords', (req, res) => {
    ChickensHouse.update({
        latitude: req.body.latitude,
        longitude: req.body.longitude
    }, {
        where: {
            id: 1
        }
        }).then(() =>{
            res.sendStatus(200)
        })
})



chickenhouse.post('/getsunmoovementtoday', (req, res) => {
    SunMoovement.findOne({
        where: {
            day: req.body.day
        }
    }).then((dates) => {
        res.json(dates)
    }).catch(err =>
        res.send(err))
})


//richiedere le prime sette date con relativi orari
chickenhouse.post('/getsunmoovementweek', (req, res) => {
    SunMoovement.findAll({
        order: [
            ['day', 'DESC']
        ],
        limit: 7
    }).then((dates) => {
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
        } else {
            res.send("Data già present")
        }
    })
})
chickenhouse.post('/setweather', (req, res) => {
    const temp = {
        date: req.body.date,
        time: req.body.time,
        temps: req.body.temperature,
        pressure: req.body.pressure,
        humidity: req.body.humidity,
        clouds: req.body.clouds,
        iconCode: req.body.iconCode
    }
    Weather.create(temp)
        .then(data => res.json({
            date: data.date,
            time: data.time,
            temp: data.temps,
            humidity: data.humidity
        }))
        .catch(err => res.send(err))
})

chickenhouse.post('/gettemphumid', (req, res) => {
    Weather.findAll({
        where: {
            date: req.body.date
        },
        attributes: ['time', 'temps', 'humidity']
    }).then(data =>
        res.json(data))
    .catch(err => res.send(err))
})

chickenhouse.post('/getlastweather', (req,res)=>{
    Weather.findOne({
        order: [
            ['date', 'DESC'],
            ['time', 'DESC']
        ]
    }).then(data=>
        res.json(data))
    .catch((err) => res.sendStatus(404))    
})
module.exports = chickenhouse
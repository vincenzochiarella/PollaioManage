const express = require("express")
const chickenhouse = express.Router()
const cors = require('cors')

const SunMoovement = require("../models/SunMoovement")
const ChickensHouse = require('../models/ChickensHouse')


chickenhouse.use(cors())
//crea un nuovo pollaio 
chickenhouse.post('/createChickenHouse',(req,res)=>{
    ChickensHouse.create({
        name: req.body.name,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        doorStatus: req.body.doorstatus
    }).then(data=> res.json(data))
    .catch(err=>res.status(500))
})

chickenhouse.post('/getDetails', (req,res)=>{
    ChickensHouse.findAll({
        where:{
            id: req.body.id
        }
    }).then((data)=>{
        res.json(data)
    }).catch(err=>
        res.json(err))
})



//richiedere le prime sette date con relativi orari
chickenhouse.post('/getsunmoovement', (req, res) => {
    var getweektimes = []

    SunMoovement.findAll({
        limit: 7,
        where: {
            chickenHouseId: req.body.chickenHouseId
        }
    }).then((dates) => {
        getweektimes.push({
            day: dates.dateSunMoovement,
            sunrise: dates.sunrise,
            sunste: dates.sunset
        })
    })
    res.json(getweektimes)
})
//aggiornare la lista presente sul db delle date
chickenhouse.post('/setsunmoovement', (req, res) => {
    const data = {
        chickenHouseId: req.body.chickenHouseId,
        day: req.body.day,
        sunrise: req.body.sunrise,
        sunrise: req.body.sunset
    }
    SunMoovement.findOne({
        where: {
            dateSunMoovement: data.day
        }
    }).then(sMoove => {
        if (!sMoove) {
            SunMoovement.create(data)
                .then(sMoove => res.json({ data: sMoove.day, chickenHouseId: sMoove.chickenHouseId }))
                .catch(err => {
                    res.send(err)
                })
        }
    })
})

module.exports = chickenhouse
const express = require("express")
const chickenhouse = express.Router()
const cors = require('cors')

const SunMoovement = require("../models/SunMoovement")


chickenhouse.use(cors())
//richiedere le prime sette date con relativi orari
chickenhouse.post('/getsunmoovement', (req, res) => {
    var getweektimes = []

    SunMoovement.findAll({
        limit: 7,
        where: {
            chickenHouseId: req.body.chickenHouseId
        }
    }).then((date) => {
        getweektimes.push({
            day: date.dateSunMoovement,
            sunrise: date.sunrise,
            sunste: date.sunset
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
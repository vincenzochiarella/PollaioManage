/**
 * @ Author: Vincenzo Chiarella
 * @ Create Time: 2019-06-27 21:02:19
 * @ GitHub Link: https://github.com/Vins97
 */


const express = require("express")
const PostRoutes = express.Router()
const cors = require('cors')

const SunMoovement = require("../models/SunMoovement")
const ChickensHouse = require('../models/ChickensHouse')
const Logs = require("../models/DoorStatus_Log")
const Weather = require('../models/Weather')

const WeekSunMovement = require('../routine/SunMoovementRequest')
const Brightness = require('../routine/BrightnessAutomatism')
const JobSync = require('../routine/JobSync')

PostRoutes.use(cors())
//crea un nuovo pollaio 
PostRoutes.post('/new', (req, res) => {
    constructorChickenHouse(req.body.name, req.body.latitude, req.body.longitude, req.body.doorStatus,
        req.body.sun, req.body.luminosity, req.body.lumSensibility, req.body.lumMin)
        .then(data => res.send(data))
        .catch(err => res.send(err))
})

PostRoutes.post('/getdoorstatus', (req, res) => {
    getDoorStatus()
        .then(status => res.send(status))
        .catch(err => res.send(err))

})
PostRoutes.post('/setdoorstatus', (req, res) => {
    setDoorStatus(req.body.doorStatus)
        .then(result => res.send(result))
        .catch(err => res.send(err))
})
PostRoutes.post('/getcoords', (req, res) => {
    getCoordinates()
        .then(coords => res.send(coords))
        .catch(err => res.send(err))

})
PostRoutes.post('/setcoords', (req, res) => {
    setCoordinates(req.body.latitude, req.body.longitude)
        .then(result => res.send(result))
        .catch(err => res.send(err))
})



PostRoutes.post('/getsunmoovementtoday', (req, res) => {
    getSunMovementsDay(req.body.day)
        .then(data => res.send(data))
        .catch(err => res.send(err))
})


//richiedere le prime sette date con relativi orari
PostRoutes.post('/getsunmoovementweek', (req, res) => {
    getSunMovementsWeek()
        .then(data => res.send(data))
        .catch(err => res.send(err))
})
PostRoutes.post('/refreshsunmoovementweek', (req, res) => {
    WeekSunMovement.APICallsWeekly()
    getSunMovementsWeek()
        .then(data => res.send(data))
        .catch(err => res.send(err))
})
//aggiornare la lista presente sul db delle date
PostRoutes.post('/setsunmoovement', (req, res) => {
    setSunMovement(req.body.day, req.body.sunrise, req.body.sunset)
        .then(data => res.send(data))
        .catch(err => res.send(err))
})

PostRoutes.post('/setweather', (req, res) => {
    setWeather(req.body.date, req.body.time, req.body.temps, req.body.pressure, req.body.humidity, req.body.clouds, req.body.iconCode)
        .then(data => res.send(data))
        .catch(err => res.send(err))
})

PostRoutes.post('/gettemphumid', (req, res) => {
    getTemperatureHumidityFromDay(req.body.date)
        .then(data => res.send(data))
        .catch(err => res.send(err))
})

PostRoutes.post('/getlastweather', (req, res) => {
    getWeatherCurrent()
        .then(data => res.send(data))
        .catch(err => res.send(err))
})

PostRoutes.post('/getauto', (req, res) => {
    getAutomatism()
        .then(data => res.send(data))
        .catch(err => res.send(err))
})

PostRoutes.post('/setauto', (req, res) => {
    setAutomatism(req.body.sun, req.body.luminosity)
        .then((data) => res.send(data))
        .catch(err => res.send(err))
    if (req.body.luminosity) {
        Brightness.start()
        JobSync.deSyncAllJob()
    } else {
        Brightness.stop()
        JobSync.syncAllJob()
    }
})

PostRoutes.post('/getlumsetting', (req, res) => {
    getLuminositySettings()
        .then(data => res.send(data))
        .catch(err => res.send(err))
})

PostRoutes.post('/setlumsetting', (req, res) => {
    ChickensHouse.update({
        lumSensibility: req.body.lumSensibility,
        lumMin: req.body.lumMin
    }, {
            where: {
                id: 1
            }
        }).then(() => {
            res.sendStatus(200)
        })
})
// PostRoutes.post('/getlumavarage', (req, res) => {
//     ChickensHouse.findOne({
//         attributes: ['lumAvarage']
//     }).then(data => res.json(data))
//         .catch((err) => res.sendStatus(404))
// })
// PostRoutes.post('/setlumavarage', (req, res) => {
//     ChickensHouse.update({
//         lumAvarage: req.body.lumAvarage
//     }, {
//             where: {
//                 id: 1
//             }
//         }).then(() => {
//             res.sendStatus(200)
//         })
// })

PostRoutes.post('/getdoorstatuslog', (req, res) => {
    Logs.findAll({
        order: [
            ['createdAt', 'DESC']
        ]
    }
    ).then(data =>
        res.json(data)
    ).catch(err => res.sendStatus(400))
})
/**
 * 
 * @param {string} name Name of chickenhouse
 * @param {double} latitude GPS coords
 * @param {double} longitude GPS coords
 * @param {integer} doorStatus Close 0 - Open 1 - Moving 2
 * @param {integer} sun Allow sunmoovement automatism 1 True 0 False 
 * @param {integer} luminosity Allow luminosity automatism 1 True 0 False 
 * @param {integer} lumSensibility Seconds between checks
 * @param {integer} lumMin Minimum lux to close door
 * @returns {promise} Inserted data
 */
function constructorChickenHouse(name, latitude, longitude, doorStatus, sun, luminosity, lumSensibility, lumMin) {
    return new Promise((res, rej) =>
        ChickensHouse.create({
            name: name,
            latitude: latitude,
            longitude: longitude,
            doorStatus: doorStatus,
            sun: sun,
            luminosity: luminosity,
            lumSensibility: lumSensibility,
            lumMin: lumMin
        }).then(data => res(JSON.parse(data)))
            .catch(err => rej(err))
    )
}
/**
 * @returns {promise} Get current door status 
 */

function getDoorStatus() {
    return new Promise((res, rej) => {
        ChickensHouse.findOne({
            attributes: ['doorStatus']
        }).then((data) => {
            res(data)
        }).catch(err =>
            rej(err))
    })
}

/**
 * 
 * @param {integer} doorstatus 0 Close 1 Open 2 Moving
 * @returns {promise} Return status of interaction with db
 */
function setDoorStatus(doorstatus) {
    return new Promise((res, rej) => {
        ChickensHouse.update({
            doorStatus: doorstatus
        }, {
                where: {
                    id: 1
                }
            }).then((data) => {
                res(data)
            }).catch((err) =>
                rej(err))
    })
}
/**
 * @returns {promise} Return data [ latitude, longitude ]
 */

function getCoordinates() {
    return new Promise((res, rej) => {
        ChickensHouse.findOne({
            attributes: ['latitude', 'longitude']
        }).then((data) => {
            res(data)
        }).catch(err =>
            rej(err))
    })
}
/**
 * 
 * @param {double} latitude Latitude for geopositioning
 * @param {double} longitude Longitude for geopositioning
 * @returns {promise} Return status of interaction with db
 */
function setCoordinates(latitude, longitude) {
    return new Promise((res, rej) => {
        ChickensHouse.update({
            latitude: latitude,
            longitude: longitude
        }, {
                where: {
                    id: 1
                }
            }).then((data) => {
                res('OK ' + data)
            }).catch(err => rej(err))
    })
}
/**
 * 
 * @param {date} day Specify witch day moovements 
 * @returns {promise} Resolved JSON with sunrise and sunset times
 */

function getSunMovementsDay(day) {
    return new Promise((res, rej) => {
        SunMoovement.findOne({
            where: {
                day: day
            }
        }).then((dates) => {
            res(dates)
        }).catch(err =>
            rej(err))
    })
}
/**
 * @returns {promise} Resolved array of date with sunrise and sunset times of last 7 days
 */
function getSunMovementsWeek() {
    return new Promise((res, rej) => {
        SunMoovement.findAll({
            order: [
                ['day', 'DESC']
            ],
            limit: 7
        }).then((dates) => {
            res(dates)
        }).catch(err => rej(err))
    })

}
/**
 * 
 * @param {string} day Day
 * @param {integer} sunrise Sunrise time HH:mm
 * @param {integer} sunset Sunset time HH:mm
 * @returns {promise} Return JSON data of day created
 */

function setSunMovement(day, sunrise, sunset) {
    return new Promise((res, rej) => {
        const data = {
            day: day,
            sunrise: sunrise,
            sunset: sunset
        }
        SunMoovement.findOne({
            where: {
                day: day
            }
        }).then(sMoove => {
            if (!sMoove) {
                SunMoovement.create(data)
                    .then(data => res())
                    .catch(err => {
                        rej(err)
                    })
            } else {
                rej('Data already setted')
            }
        })
    })

}
/**
 * 
 * @param {string} date UTC date
 * @param {integer} time HH:mm
 * @param {double} temperature Temperature in celsius
 * @param {double} pressure Pressure in bar
 * @param {integer} humidity Percentage of humidity
 * @param {integer} clouds Percentage of clouds spread
 * @param {string} iconCode OpenWeatherAPI icon code
 * @returns {promise} 
 */

function setWeather(date, time, temperature, pressure, humidity, clouds, iconCode) {
    return new Promise((res, rej) => {
        const temp = {
            date: date,
            time: time,
            temps: temperature,
            pressure: pressure,
            humidity: humidity,
            clouds: clouds,
            iconCode: iconCode
        }
        Weather.create(temp)
            .then(data => res(JSON.stringify({
                date: data.date,
                time: data.time,
                temp: data.temps,
                humidity: data.humidity
            })))
            .catch(err => rej(err))
    })
}
/**
 * 
 * @param {string} day Date
 * @returns {promise} List of temps and humidity values of the day specified
 */
function getTemperatureHumidityFromDay(day) {
    return new Promise((res, rej) => {
        Weather.findAll({
            where: {
                date: day
            },
            attributes: ['time', 'temps', 'humidity']
        })
            .then(data => res(data))
            .catch(err => rej(err))
    })
}
/**
 * @returns {promise} Resolved last weather condition sycronized
 */

function getWeatherCurrent() {
    return new Promise((res, rej) => {
        Weather.findOne({
            order: [
                ['date', 'DESC'],
                ['time', 'DESC']
            ]
        })
            .then(data => res(data))
            .catch((err) => rej(err))
    })
}
/**
 * @returns Resolve luminosity or sunmovement automatism
 */
function getAutomatism() {
    return new Promise((res, rej) => {
        ChickensHouse.findOne({
            attributes: ['sun', 'luminosity']
        })
            .then(data => res(data))
            .catch((err) => rej(err))
    })
}
/**
 * 
 * @param {integer} sunmovement 1 or 0
 * @param {integer} luminosity 1 or 0
 * @returns {promise} Resolve change affect correctly
 */
function setAutomatism(sunmovement, luminosity) {
    return new Promise((res, rej) => {
        ChickensHouse.update({
            sun: sunmovement,
            luminosity: luminosity
        }, {
                where: {
                    id: 1
                }
            })
            .then((reply) => res(reply))
            .catch((err) => rej(err))
    })
}
/**
 * @returns {promise} Resolve Minimum Lux and Seconds between check to close the door
 */

function getLuminositySettings() {
    return new Promise((res, rej) => {
        ChickensHouse.findOne({
            attributes: ['lumSensibility', 'lumMin']
        })
            .then(data => res(data))
            .catch(err => rej(err))
    })
}
/**
 * 
 * @param {integer} lumSensibility Seconds between check
 * @param {integer} lumMinimum Miminum lux required to close the door
 * @returns {promise} Resolve if it is changed
 */
function setLuminositySettings(lumSensibility, lumMinimum) {
    return new Promise((res, rej) => {
        ChickensHouse.update({
            lumSensibility: lumSensibility,
            lumMin: lumMinimum
        }, {
                where: {
                    id: 1
                }
            })
            .then((data) => res(data))
            .catch(err => rej(err))
    })
}
/**
 * @returns {promise} Return a list of door movement 
 */

function getDoorMovementLogs() {
    return new Promise((res, rej) => {
        Logs.findAll({
            order: [
                ['createdAt', 'DESC']
            ]
        }
        ).then(data => res(JSON.parse(data))
        ).catch(err => rej(err))
    })
}


module.exports.routes = PostRoutes
module.exports.dbRequest = {
    constructorChickenHouse,
    getDoorStatus,
    setDoorStatus,
    getCoordinates,
    setCoordinates,
    getSunMovementsDay,
    getSunMovementsWeek,
    setSunMovement,
    getTemperatureHumidityFromDay,
    getWeatherCurrent,
    setWeather,
    getAutomatism,
    setAutomatism,
    getLuminositySettings,
    setLuminositySettings,
    getDoorMovementLogs
}
/**
 * @ Author: Vincenzo Chiarella
 * @ Create Time: 2019-06-27 21:02:19
 * @ GitHub Link: https://github.com/Vins97
 */


var schedule = require('node-schedule')
var syncWeekDaySunmoovs = require('./SunMoovementRequest')
var moment = require('moment');
var axios = require('axios')
// var doorController = require('../DoorController')
var ChickenHouseDB = require('../APIdb/chickenhouse')
var JobsDB = require('../APIdb/jobs')


//ogni domenica crea 14 cronjob 
//due per ogni giorno con gli orari di apertura e chiusura automatica

var domenica_01h = '0 1 * * 0'
var ogniGiorno = '0 0,12 * * *'
var ogniOra = '0 * * * *'
var ogniMinuto = '0 * * * * *'

var testFunzionamento = '00 23 * * * *'


//ogni domenica all'una di mattina 
module.exports.startSyncWeekMoves = schedule.scheduleJob('weekJob', domenica_01h, function () {
    syncWeekDaySunmoovs()
})


module.exports.overrideSyncTodayMoves = syncTodayMoves = () => {
    var today = moment().format("YYYY-MM-DD")
    ChickenHouseDB.dbRequest.getSunMovementsDay(today)
        .then(data =>{
            var dateSunrise = moment(data.day + ' ' + data.sunrise).format('YYYY-MM-DD HH:mm:ss')
            var dateSunset = moment(data.day + ' ' + data.sunset).format('YYYY-MM-DD HH:mm:ss')
            JobsDB.dbRequest
                .constructorJob(dateSunrise, 1)
                .catch(err=> console.log(err))
            JobsDB.dbRequest
                .constructorJob(dateSunset, 0)
                .catch(err=> console.log(err))
        })
        .catch(err=> console.log(err))
}
module.exports.startSyncTodayMoves = schedule.scheduleJob('dayOpening', ogniGiorno, function () {
    syncTodayMoves()
})

//-------start weather sync every hour-----------
syncWeather = () => {
    ChickenHouseDB.dbRequest.getCoordinates()
        .then(data=>{
            axios.post('https://api.openweathermap.org/data/2.5/weather?appid=05e6ec37f86a9b2c3a96cd57e4f80dda&lat=' + data.dataValues.latitude + '&lon=' + data.dataValues.longitude + '&units=metric&')
            .then(weather => {
                console.log( weather.data.main.temp )
                ChickenHouseDB.dbRequest.setWeather( moment().format('YYYY-MM-DD') , moment().format('HH:mm'),weather.data.main.temp,
                    weather.data.main.pressure, weather.data.main.humidity, weather.data.clouds.all, weather.data.weather[0].icon)
                    .then(result=> console.log(result))
                    .catch(err=> console.log(err))
            })
            .catch(err => {
                console.log(err)
            })
        })
}

module.exports.startSyncEveryDayWeather = schedule.scheduleJob('dayWeatherJob', ogniOra, function () {
    syncWeather()
})
//-------end weather sync every hour-------------

module.exports.manuallySyncWeather = syncWeather
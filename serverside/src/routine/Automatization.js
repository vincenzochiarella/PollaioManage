var schedule = require('node-schedule')
var syncWeekDaySunmoovs = require('./SunMoovementRequest')
var moment = require('moment');
var axios = require('axios')
var doorController = require('../DoorController')


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

module.exports.startSyncTodayMoves = schedule.scheduleJob('dayOpening', ogniGiorno, function () {
    syncTodayMoves()
})

module.exports.overrideSyncTodayMoves = syncTodayMoves = () => {
    var today = moment().format("YYYY-MM-DD")
    axios.post('http://localhost:5000/ckHouse/getsunmoovementtoday', {
        day: today
    }).then(data => {
        var dateSunrise = moment(data.data.day + ' ' + data.data.sunrise).format('YYYY-MM-DD HH:mm:ss')
        var dateSunset = moment(data.data.day + ' ' + data.data.sunset).format('YYYY-MM-DD HH:mm:ss')
        axios.post('http://localhost:5000/job/create', {
            date: dateSunrise,
            move: 1
        }).catch(err => { console.log(err) })
        axios.post('http://localhost:5000/job/create', {
            date: dateSunset,
            move: 0
        }).catch(err => { console.log(err) })
    }).catch(err => {
        console.log(err)
    })
}


module.exports.startScheduledJob = scheduleNextJob = () => {
    axios.post('http://localhost:5000/job/getlast')
        .then(res => {
            if(res.data){
            console.log('Scheduele '+moment(res.data.date).utc().toDate() + ' mossa: '+ res.data.move)
            schedule.scheduleJob(moment(res.data.date).utc().toDate(), function () {
                console.log('esecuzione')
                switch (res.data.move) {
                     case 1:
                         doorController.open('scheduler')
                         break;
                     case 0:
                         doorController.close('scheduler')
                         break; 
                     default:
                         break;
                 }
                 axios.post('http://localhost:5000/job/delete', {
                     id: res.data.id
                 })                
                scheduleNextJob()
                
             })            
        } else{
            console.log("Nessun lavoro alle: " + moment().format('HH:mm:ss'))
            //se non trova un nuovo lavoro, controlla ogni minuto
            schedule.scheduleJob('checkUp',ogniMinuto, function () {
                 scheduleNextJob()
            })
        }
        }).catch(err=>console.log(err))
}

//-------start weather sync every hour-----------
syncWeather = () => {
    axios.post('http://localhost:5000/ckHouse/getcoords').then(data => {
        if (data) {
            axios.post('https://api.openweathermap.org/data/2.5/weather?appid=05e6ec37f86a9b2c3a96cd57e4f80dda&lat=' + data.data.latitude + '&lon=' + data.data.longitude + '&units=metric&').then(weather => {
                axios.post('http://localhost:5000/ckHouse/setweather', {
                    date: moment().format('YYYY-MM-DD'),
                    time: moment().format('HH'),
                    temperature: weather.data.main.temp,
                    pressure: weather.data.main.pressure,
                    humidity: weather.data.main.humidity,
                    clouds: weather.data.clouds.all,
                    iconCode: weather.data.weather[0].icon
                }).catch(err => {
                    console.log(err)
                })
            }).catch(err => {
                console.log(err)
            })
        }
    }).catch(err => console.log(err))
}

module.exports.startSyncEveryDayWeather = schedule.scheduleJob('dayWeatherJob', ogniOra, function () {
    syncWeather()
})
//-------end weather sync every hour-------------
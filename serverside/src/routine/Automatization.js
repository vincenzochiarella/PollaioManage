var schedule = require('node-schedule')
var syncWeekDaySunmoovs = require('./SunMoovementRequest')
var moment = require('moment');
var axios = require('axios')


//ogni domenica crea 14 cronjob 
//due per ogni giorno con gli orari di apertura e chiusura automatica

var domenica_01h = '0 1 * * 0'
var ogniGiorno = '0 0 * * *'
var ogniOra = '0 * * * *'
var ogni10Secondi = '10 * * * * *'

var testFunzionamento = '00 23 * * * *'


//ogni domenica all'una di mattina 
module.exports.startSyncWeekMoovs = schedule.scheduleJob('weekJob', domenica_01h, function () {
    syncWeekDaySunmoovs()
})

module.exports.startSyncTodayMoovs = schedule.scheduleJob('dayOpening', testFunzionamento, function () {
    var today= moment().format("YYYY-MM-DD")
    console.log(today)
    
    axios.post('http://localhost:5000/ckHouse/getsunmoovementtoday', {
        day: today
    }).then(data =>{    
        var dateSunrise = moment(data.data.day+' '+data.data.sunrise).format('YYYY-MM-DD HH:mm:ss')        
        var dateSunset = moment(data.data.day+' '+data.data.sunset).format('YYYY-MM-DD HH:mm:ss')

        var openDoor = schedule.scheduleJob(moment(dateSunrise).toDate(), ()=>{
            console.log('la porta si apre')
        })
        var closeDoor = schedule.scheduleJob(moment(dateSunset).toDate(), ()=>{
            console.log('la porta si chiude')
        })
    }).catch(err=>{
        console.log(err)
    })    
})
sync = () =>{
    axios.post('http://localhost:5000/ckHouse/getcoords').then(data => {
        console.log(data.data)
        if(data){
            axios.post('https://api.openweathermap.org/data/2.5/weather?appid=05e6ec37f86a9b2c3a96cd57e4f80dda&lat='+data.data.latitude+'&lon='+data.data.longitude+'&units=metric&').then(weather=>{         
                axios.post('http://localhost:5000/ckHouse/setweather',{
                    date: moment().format('YYYY-MM-DD'),
                    time: moment().format('HH'),
                    temperature: weather.data.main.temp,
                    pressure: weather.data.main.pressure,
                    humidity: weather.data.main.humidity,
                    clouds: weather.data.clouds.all,
                    iconCode: weather.data.weather[0].icon
                }).catch(err=>{
                    console.log(err)
                })                
                // console.log(weather.data.main.temp)
                // console.log(weather.data.main.pressure)
                // console.log(weather.data.main.humidity)
                // console.log(weather.data.clouds.all)                                
                // console.log(weather.data.weather[0].icon)
            }).catch(err=>{
                console.log(err)
            })
        }
    }).catch(err => console.log(err))
 }

module.exports.startSyncEveryDayWeather = schedule.scheduleJob('dayWeatherJob',ogniOra, function(){
    sync()  
} )
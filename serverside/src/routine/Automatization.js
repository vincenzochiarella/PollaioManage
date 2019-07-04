var schedule = require('node-schedule')
var getWeekMoovement = require('./SunMoovementRequest')

//ogni domenica crea 14 cronjob 
//due per ogni giorno con gli orari di apertura e chiusura automatica


//ogni domenica all'una di mattina 
var getAPI = schedule.scheduleJob('* 1 * * 0', function(){
    getWeekMoovement()
})
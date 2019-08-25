//ogni 12h fa una richiesta per ricavare i dati di alba e tramonto
var axios = require('axios')
var moment = require('moment');

const ChickenDB = require('../APIdb/chickenhouse')

getSunmoovement = (coords, day) => {
    if (coords && day) {
        axios.post('https://api.sunrise-sunset.org/json?lat=' + coords.latitude + '&lng=' + coords.longitude + '&date=' + day)
            .then(data => {
                ChickenDB.dbRequest.setSunMovement(
                    day,
                    moment(data.data.results.sunrise, 'hh:mm:ss A').add(2, 'hours').format('HH:mm:ss'),
                    moment(data.data.results.sunset, 'hh:mm:ss A').add(2, 'hours').format('HH:mm:ss')
                ).catch(err=> console.log(err))                             
            }).catch(err => {
                console.log("External api error: " + err)
            })            
    }
}
function getWeekday(){
    ChickenDB.dbRequest.getCoordinates()
        .then(data=>{
            var startOfWeek = moment();
            var endOfWeek = moment().add(6, "d");
            var day = startOfWeek;
            while (day <= endOfWeek) {
                getSunmoovement(data.dataValues, day.format('YYYY-MM-DD'))
                day = day.clone().add(1, 'd');
            }
        })
};

module.exports.APICallsWeekly = getWeekday






//ogni 12h fa una richiesta per ricavare i dati di alba e tramonto
var axios = require('axios')
var moment = require('moment');

const getSunmoovement = (latitude, longitude, day) => {
    axios('https://api.sunrise-sunset.org/json?lat=' + latitude + '&lng=' + longitude + '&date=' + day)
        .then(
            results => {
                return results.json()
            })
        .then(data => {
            createSunMoovement(day, data.results.sunrise, data.results.sunset)
        })        
}

// ch
const createSunMoovement = (day, sunrise, sunset) => {
    return axios.post('ckHouse/setsunmoovement',{
        chickenHouseId: 1,
        day: day,
        sunrise: moment(sunrise, 'hh:mm:ss A').add(2, 'hours').format('hh:mm:ss A'),
        sunset: moment(sunset, 'hh:mm:ss A').add(2, 'hours').format('hh:mm:ss A')
    })
}


const getWeekday = ()=> {
    var startOfWeek = moment();
    var endOfWeek = moment().add(7, "d");

    var day = startOfWeek;

    while (day <= endOfWeek) {
        getSunmoovement(day.format('YYYY-MM-DD'))
        day = day.clone().add(1, 'd');
    }
};
const startAquisition = setInterval(()=>getWeekday(), 43200000)



module.exports = [ startAquisition, createSunMoovement ]

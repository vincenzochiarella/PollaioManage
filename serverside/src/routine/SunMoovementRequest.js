//ogni 12h fa una richiesta per ricavare i dati di alba e tramonto
var axios = require('axios')
var moment = require('moment');

const getSunmoovement = ( day) => {
    var coords={}
    axios.post('ckHouse/getcoords').then(data=>{
        coords = data
    })
    axios('https://api.sunrise-sunset.org/json?lat=' + coords.latitude + '&lng=' + coords.longitude + '&date=' + day)
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
        day: day,
        sunrise: moment(sunrise, 'hh:mm:ss A').add(2, 'hours').format('hh:mm:ss'),
        sunset: moment(sunset, 'hh:mm:ss A').add(2, 'hours').format('hh:mm:ss')
    })
}


const getWeekday = ()=> {
    var startOfWeek = moment();
    var endOfWeek = moment().add(7, "d");
    coords

    var day = startOfWeek;

    while (day <= endOfWeek) {
        getSunmoovement(day.format('YYYY-MM-DD'))
        day = day.clone().add(1, 'd');
    }
};




module.exports = getWeekday

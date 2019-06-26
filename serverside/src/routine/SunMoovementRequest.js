//ogni 12h fa una richiesta per ricavare i dati di alba e tramonto
import moment from 'moment'
import axios from 'axios'

getSunmoovement = (latitude, longitude, day) => {
    fetch('https://api.sunrise-sunset.org/json?lat=' + latitude + '&lng=' + longitude + '&date=' + day)
        .then(
            results => {
                return results.json()
            })
        .then(data => {
            createSunMoovement(day, data.results.sunrise, data.results.sunset)
        })        
}


createSunMoovement = (day, sunrise, sunset) => {
    return axios.post('sun/setsunmoovement',{
        chickenHouseId: 1,
        day: day,
        sunrise: moment(sunrise, 'hh:mm:ss A').add(2, 'hours').format('hh:mm:ss A'),
        sunset: moment(sunsenpmt, 'hh:mm:ss A').add(2, 'hours').format('hh:mm:ss A')
    })
}


getWeekday = ()=> {
    var startOfWeek = moment();
    var endOfWeek = moment().add(7, "d");

    var day = startOfWeek;

    while (day <= endOfWeek) {
        this.fetchAPISunset(day.format('YYYY-MM-DD'))
        day = day.clone().add(1, 'd');
    }
};

module.exports = setInterval(getWeekday(), 43200000)
//ogni 12h fa una richiesta per ricavare i dati di alba e tramonto
var axios = require('axios')
var moment = require('moment');

getSunmoovement = (coords, day) => {
    // console.log(coords.latitude, coords.longitude)
    if (coords && day) {
        axios.post('https://api.sunrise-sunset.org/json?lat=' + coords.latitude + '&lng=' + coords.longitude + '&date=' + day)
            .then(data => {
                // console.log(day, data.data.results.sunrise, data.data.results.sunset)                
                axios.post('http://localhost:5000/ckHouse/setsunmoovement', {
                    day: day,
                    sunrise: moment(data.data.results.sunrise, 'hh:mm:ss A').add(2, 'hours').format('HH:mm:ss'),
                    sunset: moment(data.data.results.sunset, 'hh:mm:ss A').add(2, 'hours').format('HH:mm:ss')
                }).catch(err => console.log("errore sulla creazione" + err))
                
            }).catch(err => {
                console.log("errore api " + err)
            })
            
    }
}

module.exports.APICallsWeekly = getWeekday = () => {
        /**
     * FIXME: not use post request but controller
     */
    axios.post('http://localhost:5000/ckHouse/getcoords').then(data => {
        var startOfWeek = moment();
        var endOfWeek = moment().add(6, "d");
        var day = startOfWeek;
        while (day <= endOfWeek) {
            getSunmoovement(data.data, day.format('YYYY-MM-DD'))
            day = day.clone().add(1, 'd');
        }
    }).catch(err => console.log(err))

};






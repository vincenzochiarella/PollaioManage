import axios from 'axios'
import moment from 'moment'

export const getTemperatures = () =>{
    return axios.post('ckHouse/gettemphumid',{
        date: moment(new Date()).format("YYYY-MM-DD")
    })
    .then(res => {
        return res.data
    })
    .catch( err =>{
        console.log(err)
    })
}

export const getLastWeatherUpdate = () => {
    return axios.post('ckHouse/getlastweather')
    .then(res =>{
        return res.data
    })
    .catch( err=> {
        console.log(err)
    })
}
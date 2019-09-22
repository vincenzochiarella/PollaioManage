import axios from 'axios'

export const getTemperatures = ( momentDate ) =>{
    return axios.post('ckHouse/gettemphumid',{
        date: momentDate.format("YYYY-MM-DD")
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
import axios from 'axios'

export const getWeekSunMoovement = () =>{
    return axios.post('ckHouse/getsunmoovementweek')
    .then(res => {
        return res.data
    })
    .catch( err =>{
        console.log(err)
    })
}
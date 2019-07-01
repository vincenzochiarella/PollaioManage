import axios from 'axios'

export const getWeekSunMoovement = () =>{
    return axios.post('ckHouse/getsunmoovement')
    .then(res => {
        return res.data
    })
    .catch( err =>{
        console.log(err)
    })
}
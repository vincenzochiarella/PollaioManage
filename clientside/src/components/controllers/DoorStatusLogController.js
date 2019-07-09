import axios from 'axios'

export const getDoorStatusLog = () =>{
    return axios.post('ckHouse/getdoorstatuslog')
    .then(res=> {
        return res.data
    }).catch( err=> {
        console.log(err)
    })
}
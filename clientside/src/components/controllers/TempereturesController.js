import axios from 'axios'

export const getTemperatures = () =>{
    return axios.post('ckHouse/getTemp',{
        date: new Date().getUTCDate()
    })
    .then(res => {
        return res.data
    })
    .catch( err =>{
        console.log(err)
    })
}
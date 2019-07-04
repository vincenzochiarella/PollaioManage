import axios from 'axios'
import moment from 'moment'

export const getTemperatures = () =>{
    return axios.post('ckHouse/getTemp',{
        date: moment(new Date()).format("MM-DD-YYYY")
    })
    .then(res => {
        return res.data
    })
    .catch( err =>{
        console.log(err)
    })
}
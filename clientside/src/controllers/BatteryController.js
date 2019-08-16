import axios from 'axios'
export const getBatteryLevel = () =>{
    return axios.post('battery/getlast')
    .then(res=> {
        return res.data
    }).catch( err=> {
        console.log(err)
    })
}

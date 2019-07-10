import axios from 'axios'

export const getDoorStatusLog = () =>{
    return axios.post('ckHouse/getdoorstatuslog')
    .then(res=> {
        return res.data
    }).catch( err=> {
        console.log(err)
    })
}
export const setDoorStatusLog = (doorstatus) =>{
    return axios.post('ckHouse/setdoorstatuslog',{
        doorStatus: doorstatus
    })
    .then(res=> {
        return res.data
    }).catch( err=> {
        console.log(err)
    })
}
import axios from 'axios'

export const getDoorStatusLog = () =>{
    return axios.post('ckHouse/getdoorstatuslog')
    .then(res=> {
        return res.data
    }).catch( err=> {
        console.log(err)
    })
}
export const setDoorOpen = (user) =>{
    return axios.post('door/open', {
        user: user
    }).then(res => {
        return res.status
    }).catch( err =>{
        console.log(err)
    })
}
export const setDoorClose = (user) =>{
    return axios.post('door/close', {
        user: user
    }).then(res => {
        return res.status
    }).catch( err =>{
        console.log(err)
    })
}
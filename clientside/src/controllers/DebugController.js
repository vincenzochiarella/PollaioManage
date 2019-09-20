import axios from 'axios'

export const setOverrideDoor = ( value ) =>{
    return axios.post('ckHouse/setdoorstatus',{
        doorStatus: value
    })
    .then(res => {
        return res.data
    })
    .catch( err =>{
        console.log(err)
    })
}
import axios from 'axios'

export const getCoords = () =>{
    return axios.post('ckHouse/getcoords')
    .then(res=> {
        return res.data
    }).catch( err=> {
        console.log(err)
    })
}

export const setCoords = (lat,lon) =>{
    return axios.post('ckHouse/setcoords',{
        latitude: lat,
        longitude: lon
    })
    .then(res=> {
        return res.data
    }).catch( err=> {
        console.log(err)
    })
}



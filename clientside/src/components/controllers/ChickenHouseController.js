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

export const getAutomatism = () =>{
    return axios.post('ckHouse/getauto')
    .then(res=>{
        return res.data
    }).catch(
        (err)=>console.log(err)
    )
}

export const setAutomatism = (sun, lum) => {
    return axios.post('ckHouse/setauto',{
        sun: sun,
        luminosity: lum
    }).then(res=>{
        return res.data
    }).catch(err=>{
        console.log(err)
    })
}



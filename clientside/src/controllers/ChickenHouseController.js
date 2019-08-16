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

export const getDoorstatus= () =>{
    return axios.post('ckHouse/getdoorstatus')
    .then(res=>{
        return res.data
    }).catch(
        (err)=>console.log(err)
    )
}

export const setDoorstatus = (ds) => {
    return axios.post('ckHouse/setdoorstatus',{
        doorStatus: ds
    }).then(res=>{
        return res.data
    }).catch(err=>{
        console.log(err)
    })
}

export const setLumsetting = ( min, sens ) =>{
    return axios.post('ckHouse/setlumsetting',{
        lumSensibility: sens,
        lumMin: min
    }).then(res=>{
        return res.data
    }).catch(err=>{
        console.log(err)
    })
}

export const getLumsetting = () =>{
    return axios.post('ckHouse/getlumsetting')
    .then(res=>{
        return res.data
    }).catch(err=>{
        console.log(err)
    })
}

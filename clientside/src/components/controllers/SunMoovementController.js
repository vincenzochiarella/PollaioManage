import axios from 'axios'

export const getWeekSunMoovement = chickenHouseId =>{
    return axios.post('sun/getsunmoovement',{
        chickenHouseId: chickenHouseId
    })
    .then(res => {
        return res.data
    })
    .catch( err =>{
        console.log(err)
    })
}
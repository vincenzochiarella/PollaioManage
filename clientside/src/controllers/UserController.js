import axios from 'axios'
/**
 * TODO: After a period of time request login
 */
export const login = user =>{
    return axios.post('users/login',{
        username: user.username,
        password: user.password
    })
    .then(res => {
        localStorage.setItem('userToken', res.data)
        return res.data
    })
    .catch( err =>{
        console.log(err)
    })
}
export const isAuthenticated = () => {
    return localStorage.getItem('userToken') ? true : false
}
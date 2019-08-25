const express = require('express')
const PostRoute = express.Router()
const cors = require('cors')

const Brightness = require('../models/Brightness')
PostRoute.use(cors())

PostRoute.post('/create', (req, res) => {
    constructorBrightValues(req.body.value)
        .then(data => res.send(data))
        .catch(err => res.send(err))
})

PostRoute.post('/getlimited', (req, res) => {
    getBrightnessNValues(req.body.limit)
        .then(data=>res.send(data))
        .catch(err=>res.send(err))
})

/**
 * 
 * @param {float} value Lux value
 * @returns {promise} Resolve if created
 */
function constructorBrightValues(value) {
    return new Promise((res, rej) => {
        Brightness.create({
            value: value
        })
            .then(data => res(JSON.parse(data)))
            .catch((err) => rej(err))
    })
}
/**
 * 
 * @param {integer} count Corrispond to seconds 
 * @return {promise} Resolve a list of values 
 */
function getBrightnessNValues(count) {
    return new Promise((res, rej) => {
        Brightness.findAll({
            limit: count,
            order: [
                ['createdAt', 'DESC']
            ]
        })
            .then(data => res(JSON.parse(data)))
            .catch(err => rej(err))
    })

}

module.exports.routes = PostRoute
module.exports.dbRequest = {
    constructorBrightValues,
    getBrightnessNValues
}
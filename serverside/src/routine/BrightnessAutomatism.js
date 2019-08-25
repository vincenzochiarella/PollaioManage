/**
 * @ Author: Vincenzo Chiarella
 * @ Create Time: 2019-08-23 18:33:56
 * @ GitHub Link: https://github.com/Vins97
 */
const Brightness = require('../models/Brightness')
const DoorController = require('../DoorController')
var idInterval = 0
/**
 * 
 * @param {integer} seconds Numeber of seconds to analize 
 */
function getAvarageBrightness(seconds) {
    return new Promise(
        (res, rej) => {
            Brightness.findAll({
                limit: seconds,
                order: [
                    ['createdAt', 'DESC']
                ]
            }).then(data => {
                var sum = 0
                var count = 0                
                data.map(value => {
                    sum = sum + value.dataValues.value
                    count = count + 1
                })
                res(Math.floor(sum / count))
            }).catch(err => rej(err))
        }
    )
}
/**
 * 
 * @param {integer} sensibility espress in seconds
 * @param {intger} minimum espress in lux
 */
/*
FIXME: Close and open movement bug
 */
function startAutomaticBrightness(sensibility, minimum) {
    idInterval = setInterval(() => {
        getAvarageBrightness(sensibility).then(
            avarage => {
                if (avarage < minimum)
                    DoorController.close('luminositá')
                else
                    DoorController.open('luminositá')
            }
        )
    }, sensibility * 1000)
}
function stopAutomaticBrightness() {
    clearInterval(idInterval)
}
module.exports.start = startAutomaticBrightness
module.exports.stop = stopAutomaticBrightness
var weekMoovs = require('./routine/SunMoovementRequest')
var automatic = require('./routine/Automatization')
var JobSync = require('./routine/JobSync')
var BrightAdaptive = require('./routine/BrightnessAutomatism')
var AutomatismDB = require('./APIdb/chickenhouse')
var StreamRaspCam = require('./streaming/RaspPiCameraStream')



automatic.startSyncWeekMoves
automatic.startSyncEveryDayWeather
automatic.manuallySyncWeather
/**
 * @description Start server module
 */
function init() {
    StreamRaspCam.startJSmpegStream()
    AutomatismDB.dbRequest.getAutomatism()
        .then(data => {
            if (data.dataValues.sun) {
                automatic.startSyncTodayMoves
                JobSync.syncAllJob()
                BrightAdaptive.stop()
            }
            else{
                automatic.stopSyncTodayMoves()
                JobSync.deSyncAllJob()
                BrightAdaptive.start()
            }     

    })
}

module.exports.init = init
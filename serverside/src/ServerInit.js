// const weekMoovs = require('./routine/SunMoovementRequest')
const automatic = require('./routine/Automatization')
const JobSync = require('./routine/JobSync')
const BatteryRoutine = require('./routine/BatteryLevelAutomatism')
const BrightAdaptive = require('./routine/BrightnessAutomatism')
const AutomatismDB = require('./APIdb/chickenhouse')
const StreamRaspCam = require('./streaming/RaspPiCameraStream')
const PythonScript = require('./ScriptPy')


automatic.startSyncWeekMoves
automatic.startSyncEveryDayWeather
automatic.manuallySyncWeather
/**
 * @description Start server module
 */
function init() {
    //Inizializza lo script ffmpeg per aquisire il video dalla telecamera interna
    StreamRaspCam.startJSmpegStream()
    //Inizializza lo script per aquisire dati sulla luminositá esterna
    BatteryRoutine.startBatteryScript
    AutomatismDB.dbRequest.getAutomatism()
        .then(data => {
            if (data.dataValues.sun) {
                automatic.startSyncTodayMoves
                JobSync.syncAllJob()
                PythonScript.stopBrightnessTakeOver()                
                BrightAdaptive.stop()
            }
            else{
                automatic.stopSyncTodayMoves()
                JobSync.deSyncAllJob()
                PythonScript.startBatteryLevelTakeOver()
                BrightAdaptive.start()
            }     

    })
}

module.exports.init = init
const spawn = require("child_process").spawn;
const pathFolder = require('path').resolve(__dirname, '.');

const BatteryLevel = require('../models/BatteryLevel')
const Brightness = require('../models/Brightness')

var BrightnessTakeOver_Process = null
var BatteryLevel_Process = null
var lockProcess = null

module.exports.runOpendoor = pyOpen = () => {
    console.log("Apri")
    var wasBrightActive = false
    if (lockProcess !== null)
        lockProcess.exit(0)
    if (BatteryLevel_Process !== null)
        BatteryLevel_Process.exit(0)
    if (BrightnessTakeOver_Process !== null) {
        stopBright()
        isBrightActive = true
    }

    if (lockProcess === null) {
        lockProcess = spawn('python', [pathFolder + '/OpenDoor.py'])
        lockProcess.on('close', () => {
            return true
        })
    }
    if (wasBrightActive)
        pyBright()

}
module.exports.runClosedoor = pyClose = () => {
    console.log("Chiudi")
    var wasBrightActive = false
    if (lockProcess !== null)
        lockProcess.exit(0)
    if (BrightnessTakeOver_Process !== null) {
        stopBright()
        wasBrightActive = true
    }
    if (BatteryLevel_Process !== null)
        BatteryLevel_Process.exit(0)

    if (lockProcess === null) {
        lockProcess = spawn('python', [pathFolder + '/CloseDoor.py'])
        lockProcess.on('close', () => {
            return true
        })
    }
    if (wasBrightActive)
        pyBright()
}

module.exports.startBatteryLevelTakeOver = pyBatteryLevel = () => {
    console.log("Ricava livello batteria")    
    if (lockProcess === null) {
        var wasBrightActive = false
        if (BrightnessTakeOver_Process){
            stopBright()
            wasBrightActive = true
        }
        BatteryLevel_Process = spawn('python', [pathFolder + '/CheckBatteryLevel.py'])
        BatteryLevel_Process.stdout.on('data', (data) => {
            BatteryLevel.create({
                value: data
            }).then(() => { }).catch((err) => { console.log(err) })
            BatteryLevel_Process.exit(0)
        })
        if(wasBrightActive)
            pyBright()
    }
}

module.exports.startBrightnessTakeOver = pyBright = () => {
    console.log("Inizio valori luminosità")
    if (lockProcess === null && BatteryLevel_Process === null) {
        BrightnessTakeOver_Process = spawn('python', [pathFolder + '/CheckBatteryLevel.py'])
        BrightnessTakeOver_Process.stdout.on('data', (data) => {
            Brightness.create({
                value: data
            }).then(() => { }).catch((err) => { console.log(err) })
        })
    }
}

module.exports.stopBrightnessTakeOver = stopBright = () => {
    console.log('Fine valori luminosità')
    if (BrightnessTakeOver_Process) {
        BrightnessTakeOver_Process.exit(0)
    }
}

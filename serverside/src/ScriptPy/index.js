const spawn = require("child_process").spawn;
const pathFolder = require('path').resolve(__dirname, '.');

const BatteryLevel = require('../models/BatteryLevel')
const Brightness = require('../models/Brightness')

var BrightnessTakeOver_Process = null
var BatteryLevel_Process = null
var lockProcess = null

module.exports.runOpendoor = pyOpen = () => {
    console.log("Apri")
    let wasBrightActive = false
    if (BatteryLevel_Process !== null)
        process.kill(BatteryLevel_Process.pid)
    if (BrightnessTakeOver_Process !== null) {
        stopScriptBrightness()
        wasBrightActive = true
    }
    if (lockProcess === null) {
        lockProcess = spawn('python', [pathFolder + '/OpenDoor.py'])
        console.log('Spawned open: ' + lockProcess.pid)
        lockProcess.on('close', () => {
            if (wasBrightActive)
                setTimeout(() => runScriptBrightness(), 2000)
        })

    }
}
module.exports.runClosedoor = pyClose = () => {
    console.log("Chiudi")
    let wasBrightActive = false
    if (BatteryLevel_Process !== null)
        BatteryLevel_Process.exit(0)
    if (BrightnessTakeOver_Process) {
        stopScriptBrightness()
        wasBrightActive = true
    }
    if (lockProcess === null) {
        lockProcess = spawn('python', [pathFolder + '/CloseDoor.py'])
        console.log('Spawned close: ' + lockProcess.pid)
        lockProcess.on('close', () => {
            if (wasBrightActive)
                setTimeout(() => runScriptBrightness(), 2000)
        })
    }
}

module.exports.startBatteryLevelTakeOver = pyBatteryLevel = () => {
    console.log("Ricava livello batteria")
    if (lockProcess === null) {
        let wasBrightActive = false
        if (BrightnessTakeOver_Process){
            stopScriptBrightness()
            wasBrightActive = true
        }
        try{
            BatteryLevel_Process = spawn('python', [pathFolder + '/checkBatteryLevel.py'])
            BatteryLevel_Process.stdout.on('data', (data) => {
                BatteryLevel.create({
                    value: data
                }).then(() => { }).catch((err) => { console.log(err) })

            })
            process.kill(BatteryLevel_Process.pid)
            setTimeout(() => runScriptBrightness(), 2000)
        }catch(err){}
        if(wasBrightActive)
            pyBright()
    }
}
function runScriptBrightness() {
    BrightnessTakeOver_Process = spawn('python', [pathFolder + '/GetBrightness.py'])
    console.log(BrightnessTakeOver_Process.pid)
    BrightnessTakeOver_Process.stdout.on('data', (data) => {
        Brightness.create({
            value: data
        }).then(() => { })
            .catch((err) => { console.log(err) })
    })
}
module.exports.startBrightnessTakeOver = pyBright = () => {
    console.log("Inizio valori luminosità")
    if (lockProcess === null && BatteryLevel_Process === null) {
        runScriptBrightness()
    }
}

module.exports.stopBrightnessTakeOver = stopScriptBrightness = () => {
    if (BrightnessTakeOver_Process !== null) {
        
        try {
            console.log('Kill bright ' + BrightnessTakeOver_Process.pid)
            process.kill(BrightnessTakeOver_Process.pid)
        }
        catch (err) { }
    }
}

const spawn = require("child_process").spawn;
const pathFolder = require('path').resolve(__dirname, '.');

const BatteryLevel = require('../models/BatteryLevel')
const Brightness = require('../models/Brightness')

var BrightnessTakeOver_Process = null

module.exports.runOpendoor =  pyOpen = ( ) =>{
    console.log("Apri")
    //var open= spawn('python',[pathFolder+'/OpenDoor.py']);
    //open.on('close', ()=> {return true})

}
module.exports.runClosedoor = pyClose = ( ) =>{
    console.log("Chiudi")
    //var close = spawn('python',[pathFolder+'/CloseDoor.py']);
    //close.on('close', ()=> {return true})
}

module.exports.startBatteryLevelTakeOver = pyBatteryLevel = () =>{
    var batteryLevelProcess = spawn('python',[pathFolder+'/CheckBatteryLevel.py'])
    batteryLevelProcess.stdout.on('data', (data)=>{
        BatteryLevel.create({
            value: data
        }).then(()=>{}).catch((err)=>{console.log(err)})
    })
}

module.exports.startBrightnessTakeOver = pyBatteryLevel = () =>{
    BrightnessTakeOver_Process = spawn('python',[pathFolder+'/CheckBatteryLevel.py'])
    BrightnessTakeOver_Process.stdout.on('data', (data)=>{
        Brightness.create({
            value: data
        }).then(()=>{}).catch((err)=>{console.log(err)})
    })
}

module.exports.stopBrightnessTakeOver = stopBright = () => {
    BrightnessTakeOver_Process.exit(0)
}
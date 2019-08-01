const spawn = require("child_process").spawn;
const pathFolder = require('path').resolve(__dirname, '.');

const BatteryLevel = require('../models/BatteryLevel')



module.exports.runOpendoor =  pyOpen = () =>{
    console.log("Apri")
    //var open= spawn('python',[pathFolder+'/OpenDoor.py']);
}
module.exports.runClosedoor = pyClose = () =>{
    console.log("Chiudi")
    //var close = spawn('python',[pathFolder+'/CloseDoor.py']);
}

module.exports.getBatteryLevel = pyBatteryLevel = () =>{
    var batteryLevelProcess = spawn('python',[pathFolder+'/CheckBatteryLevel.py'])
    batteryLevelProcess.stdout.on('data', (data)=>{
        BatteryLevel.create({
            value: data
        }).then(()=>{}).catch((err)=>{console.log(err)})
    })
}

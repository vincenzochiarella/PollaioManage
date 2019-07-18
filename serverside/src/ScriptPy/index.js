const spawn = require("child_process").spawn;
const pathFolder = require('path').resolve(__dirname, '.');
const pyOpen = spawn('python',[pathFolder+'/OpenDoor.py']);
const pyClose = spawn('python',[pathFolder+'/CloseDoor.py']);


module.exports.runOpendoor = pyOpen
module.exports.runClosedoor = pyClose


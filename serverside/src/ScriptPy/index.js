const spawn = require("child_process").spawn;
const pathFolder = require('path').resolve(__dirname, '.');



module.exports.runOpendoor =  pyOpen = () =>{
    console.log("Apri")
    // spawn('python',[pathFolder+'/OpenDoor.py']);
}
module.exports.runClosedoor = pyClose = () =>{
    console.log("Chiudi")
    // spawn('python',[pathFolder+'/CloseDoor.py']);
}


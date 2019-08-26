const RstpStreamVlc = require('child_process')

var process = []
module.exports.startVlcRTSP = function startScript(){
    process = RstpStreamVlc.exec(`raspivid -o - -t 0 -n -w 858 -h 480 -fps 15 | cvlc -vvv stream:///dev/stdin --sout '#rtp{sdp=rtsp://:8554/}' :demux=h264`)
    process.map( pro => {
        console.log(pro.pid)
    })
}

module.exports.stopVlcRTSP = function stopScript(){
    console.log('Process killed '+ process.pid)
    process.map( pro =>{
        pro.kill()
    })
}




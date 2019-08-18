const RstpStreamVlc = require('child_process')

var process = null
module.exports.startVlcRTSP = function startScript(){
    process = RstpStreamVlc.spawn('raspivid',['-o','-','-t','0','-n','-w','1280','-h','720','-fps','15','|', 'cvlc', '-vvv', 'stream:///dev/stdin', '--sout', '"' + '#rtp{sdp=rtsp://:8554/}'+ '"', ':demux=h264]'])
    console.log('Start process ' +process.pid)
}

module.exports.stopVlcRTSP = function stopScript(){
    console.log('Process killed '+ process.pid)
    process.kill()
}




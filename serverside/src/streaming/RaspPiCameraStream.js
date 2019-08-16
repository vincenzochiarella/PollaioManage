const RstpStreamVlc = require('child_process').spawn


module.exports.startVlcRSTP = function startScript(){
    const startStream = RstpStreamVlc('raspivid',['-o','-','-t','0','-n','-w','1280','-h','720','-fps','15','|', 'cvlc', '-vvv', 'stream:///dev/stdin', '--sout', "'#rtp{sdp=rtsp://:8554/}'", ':demux=h264]'])
}




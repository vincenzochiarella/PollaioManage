const RstpStreamVlc = require('child_process')

var process = null
module.exports.startVlcRTSP = function startScript(){
    process = RstpStreamVlc.exec(`raspivid -o - -t 0 -n -w 858 -h 480 -fps 15 | cvlc -vvv stream:///dev/stdin --sout '#rtp{sdp=rtsp://:8554/}' :demux=h264`)
        console.log(pro.pid)
}

module.exports.stopVlcRTSP = function stopScript(){
    console.log('Process killed '+ process.pid)
    process.kill()
}


module.exports.startJSmpegStream = function startStream(){
    const JSmpeg = RstpStreamVlc.exec(`ffmpeg -f v4l2 -framerate 30 -video_size 640x480 -i /dev/video0 -f mpegts -codec:v mpeg1video -s 640x480 -b:v 1000k -bf 0 http://localhost:8081/supersecret `)
}



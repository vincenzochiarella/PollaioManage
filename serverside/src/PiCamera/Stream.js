import { StreamCamera, Codec } from "pi-camera-connect";
import * as fs from "fs";



// utilizza la libreria pi-camera-connect per ulteriori informazioni cercare npm pi-camera-connect
const videoStream = null;
const writeStream = null;
const streamCamera = null;

const startStreamPiCamera = () => {

    streamCamera = new StreamCamera({
        codec: Codec.H264
    });

    videoStream = streamCamera.createStream();
    writeStream = fs.createWriteStream("video-stream.h264");

    // Pipe the video stream to our video file
    videoStream.pipe(writeStream);
    streamCamera.startCapture();
    // We can also listen to data events as they arrive
    videoStream.on("data", data => console.log("New data", data));

};

const stopStreamPiCamera = () => {
    if (videoStream && streamCamera) {
        videoStream.on("end", data => console.log("Video stream has ended"));
        streamCamera.stopCapture();
    }
}

module.exports = [startStreamPiCamera, stopStreamPiCamera]
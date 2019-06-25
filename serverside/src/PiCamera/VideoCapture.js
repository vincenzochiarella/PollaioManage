import { StreamCamera, Codec } from "pi-camera-connect";
import * as fs from "fs";
import dateTime from '../helpers/dateTime'
 
// Capture 5 seconds of H264 video and save to disk
const videoCapture = async () => {
 
    const streamCamera = new StreamCamera({
        codec: Codec.H264
    });
 
    const videoStream = streamCamera.createStream();
 
    const writeStream = fs.createWriteStream("video-stream_"+dateTime+".h264");
 
    videoStream.pipe(writeStream);
 
    await streamCamera.startCapture();
    
    await new Promise(resolve => setTimeout(() => resolve(), 5000));
 
    await streamCamera.stopCapture();
};

module.exports = videoCapture
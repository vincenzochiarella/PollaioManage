import { StillCamera } from "pi-camera-connect";
import * as fs from "fs";
import dateTime from '../helpers/dateTime'

// Take still image and save to disk
const snapShot = () => {

    const stillCamera = new StillCamera();

    const image = stillCamera.takeImage();

    //salva una foto sul raspberry TODO download da browser
    fs.writeFileSync("camera-internal_"+dateTime+".jpg", image);
};

module.export = snapShot
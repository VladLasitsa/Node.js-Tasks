"use strict";

import fs from 'fs';

class DirWatcher {
    constructor(emitter) {
        this.emitter = emitter;
    }

    watch(sPath, iDelay) {
        let oldData = {};
        setInterval(() => {
            fs.readdir(sPath, (oErr, aFiles) => {
                if (!oErr) {
                    aFiles.forEach(sFileName => {
                        let sFilePath = sPath + "/" + sFileName;
                        fs.stat(sFilePath, (oErr, oData) => {
                            if (oErr) {
                                console.log(oErr);
                            } else {
                                if (!oldData[sFilePath] || oldData[sFilePath] !== oData.mtimeMs) {
                                    console.log(`File ${sFileName} was changed!`);
                                    this.emitter.emit("dirwatcher:changed", sFilePath);
                                    oldData[sFilePath] = oData.mtimeMs;
                                }
                            }
                        });
                    });
                } else {
                    console.log(oErr);
                }
            });
        }, iDelay);
    }
}

export default DirWatcher;
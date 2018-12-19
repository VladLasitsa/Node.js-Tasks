"use strict";

import fs from 'fs';

class DirWatcher {
    constructor(emitter) {
        this.emitter = emitter;
    }

    watch(sPath, iDelay) {
        let oldData = {};
        setTimeout(function checkFiles() {
            fs.readdir(sPath, (oErr, aFiles) => {
                if (!oErr) {
                    let aDeletedFiles = Object.keys(oldData).filter(sFileName => {
                        if (aFiles.indexOf(sFileName) === -1) {
                            delete oldData[sFileName];
                            return true;
                        }
                    });
                    aDeletedFiles.forEach(sDelitedFileName => console.log(`File ${sDelitedFileName} was removed!`));
                    aFiles.forEach(sFileName => {
                        let sFilePath = sPath + "/" + sFileName;
                        fs.stat(sFilePath, (oErr, oData) => {
                            if (oErr) {
                                console.log(oErr);
                            } else {
                                if (!oldData[sFileName] || oldData[sFileName] !== oData.mtimeMs) {
                                    console.log(`File ${sFileName} was changed!`);
                                    this.emitter.emit("dirwatcher:changed", sFilePath);
                                    oldData[sFileName] = oData.mtimeMs;
                                }
                            }
                        });
                    });
                } else {
                    console.log(oErr);
                }
            });
            setTimeout(checkFiles.bind(this), iDelay);
        }.bind(this), iDelay);
    }
}

export default DirWatcher;
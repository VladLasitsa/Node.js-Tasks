"use strict";

import fs from 'fs';

class DirWatcher {
    constructor(emitter) {
        this.emitter = emitter;
    }

    watch(sPath, iDelay) {
        let oldData = {};
        setTimeout(function checkDirChanges() {
            fs.readdir(sPath, (oErr, aFiles) => {
                if (!oErr) {
                    this.checkDeletedFiles(oldData, aFiles);
                    aFiles.forEach(sFileName => this.checkFileChanged(sPath, sFileName, oldData));
                } else {
                    console.log(oErr);
                }
            });
            setTimeout(checkDirChanges.bind(this), iDelay);
        }.bind(this), iDelay);
    }

    checkDeletedFiles(oldData, aFiles) {
        let aDeletedFiles = Object.keys(oldData).filter(sFileName => {
            if (aFiles.indexOf(sFileName) === -1) {
                delete oldData[sFileName];
                return true;
            }
        });
        aDeletedFiles.forEach(sDelitedFileName => console.log(`File ${sDelitedFileName} was removed!`));
    }

    checkFileChanged(sPath, sFileName, oldData) {
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
    }
}

export default DirWatcher;
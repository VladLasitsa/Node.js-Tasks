"use strict";

import fs from 'fs';
import csvjson from 'csvjson';

const sEncoding = 'utf8';
const oCsvjsonOptions = { delimiter: ';' };

class Importer {
    constructor(emitter) {
        emitter.on("dirwatcher:changed", (sPath) => {
            this.import(sPath)
                .then(oData => console.log(`import data from file: ${sPath} \n`, oData))
                .catch(oError => console.log(oError));

            let oConvertedData = this.importSync(sPath);
            console.log(`importSync data from file: ${sPath} \n`, oConvertedData);
        });
    }

    import(sPath) {
        return new Promise((resolve, reject) => {
            fs.readFile(sPath, sEncoding, (oErr, sData) => {
                if (oErr) {
                    reject(error);
                } else {
                    resolve(csvjson.toObject(sData, oCsvjsonOptions));
                }
            });
        });
    }

    importSync(sPath) {
        let sData = fs.readFileSync(sPath, sEncoding);
        return csvjson.toObject(sData, oCsvjsonOptions);
    }
}

export default Importer;
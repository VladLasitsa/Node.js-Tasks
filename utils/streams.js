"use strict";

const commander = require("commander");
const through = require("through2");
const fs = require("fs");
const csv2json = require("csv2json");
const path = require("path");

function defineTypeOfAction() {
    switch (commander.action) {
        case "reverse":
            reverse();
            break;
        case "transform":
            transform();
            break;
        case "outputFile":
            outputFile();
            break;
        case "convertFromFile":
            convertFromFile();
            break;
        case "convertToFile":
            convertToFile();
            break;
        case "cssBundler":
            cssBundler();
            break;
        default:
            console.error(`This action: "${commander.action}" is not supported.\nYou can use the following actions.`);
            commander.outputHelp();
    } 
}

function reverse() {
    process.stdin.on("data", (data) => {
        process.stdout.write(data.toString().split("").reverse().join(""));
    });
}

function transform() {
    function write(buffer, encoding, next) {
        this.push(buffer.toString().toUpperCase());
        next();
    }
    const stream = through(write);
    process.stdin.pipe(stream).pipe(process.stdout);
}

function outputFile() {
    _checkFileName();
    function write(buffer, encoding, next) {
        this.push(buffer.toString());
        next();
    }
    const stream = through(write);
    fs.createReadStream(commander.file)
        .on("error", error => console.error(error))
        .pipe(stream)
        .pipe(process.stdout);
}

function convertFromFile() {
    _checkFileName();
    _checkFileExtension(".cvs");
     fs.createReadStream(commander.file)
        .on("error", error => console.error(error))
        .pipe(csv2json({
            separator: ";"
        }))
        .pipe(process.stdout);
}

function convertToFile() {
    _checkFileName();
    _checkFileExtension(".cvs");
    let filePath = commander.file;
    const writeStream = fs.createWriteStream(filePath.replace(/\.[^\.]+$/, ".json"));
    fs.createReadStream(filePath)
        .on("error", error => console.error(error))
        .pipe(csv2json({
            separator: ";"
        }))
        .pipe(writeStream)
        .on("error", error => console.error(error));
}

function cssBundler() {
    _checkPath();
    const dirPath = commander.path;
    const writeStream = fs.createWriteStream(dirPath + "/bundle.css");
    writeStream.on("error", error => console.error(error));
    fs.readdir(dirPath, (error, files) => {
        if (error) {
            console.error(error);
        }

        files.forEach(file => {
            if (path.extname(file) === ".css" && file !== "bundle.css") {
                 fs.createReadStream(dirPath + "/" + file)
                    .on("error", error => console.error(error))
                    .pipe(writeStream);
            }
        });

        fs.createReadStream("./utils/nodejs-homework3.css")
            .on("error", error => console.error(error))
            .pipe(writeStream);
    });
}

function _checkFileName() {
    if (!commander.file) {
        console.error("You don't specify file name!")
        process.exit();
    }
}

function _checkPath() {
    const extName = path.extname(commander.path);
    if (!commander.path || (extName && extName !== "")) {
        console.error("You don't right specify path!")
        process.exit();
    }
}

function _checkFileExtension(extension) {
    if (path.extname(commander.file) !== extension) {
        console.error("The File has a wrong extension. The file should be cvs.");
        process.exit();
    }
}

commander
  .version("0.1.0")
  .option("-a, --action <value>", "Type of action")
  .option("-f, --file [value]", "Name of file")
  .option("-p, --path [dirPath]", "Path of directory");

commander.on("--help", function(){
    console.log("")
    console.log("Actions:");
    console.log(`
        * reverse
        * transform
        * outputFile
        * convertFromFile
        * convertToFile
        * cssBundler`);
});

commander.parse(process.argv);

if (!process.argv.slice(2).length) {
    commander.outputHelp();
    process.exit();
}

defineTypeOfAction();
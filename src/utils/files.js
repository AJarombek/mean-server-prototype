/**
 * Utility class for saving and retrieving picture files
 * @author Andrew Jarombek
 * @since 2/25/2018
 */

const fs = require('fs');
const path = require('path');

// Save a file.  This function will be exported with the module
// https://stackoverflow.com/questions/6926016/nodejs-saving-a-base64-encoded-image-to-disk
exports.saveFile = function saveFile(name, data) {

    const base64 = data.replace(/^data:image\/([a-z]+);base64,$/, "");

    fs.writeFile(path.join(__dirname, `../../pics/${name}`), base64, 'base64', (err) => {
        console.error(err);
    });
};

// Load a file from the filesystem.  This function is also exported with the module
// https://stackoverflow.com/questions/24523532/how-do-i-convert-an-image-to-a-base64-encoded-data-url-in-sails-js-or-generally
exports.loadFile = function loadFile(name) {

    const data = fs.readFileSync(path.join(__dirname, `../../pics/${name}`));

    return `data:image\/jpg;base64,${data}`;
};

// Remove a file from the filesystem.
exports.removeFile = function removeFile(name) {
    fs.unlink(path.join(__dirname, `../../pics/${name}`), (err) => {

        if (err) {
            console.error('Failed to Remove File');
        } else {
            console.error(`File with name ${name} Removed`);
        }
    });
};

// List all the picture files currently on the Node Express server
exports.listFiles = function listFiles() {
    fs.readdir(path.join(__dirname, '../../pics'), (err, files) => {

        console.info(path.join(__dirname, '../../pics'));
        console.info(`Files in Directory: \n`);
        files.forEach(file => {
            console.info(file);
        });
    });
};

module.exports = exports;
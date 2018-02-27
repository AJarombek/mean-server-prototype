/**
 * Utility class for saving and retrieving picture files
 * @author Andrew Jarombek
 * @since 2/25/2018
 */

const fs = require('fs');

// Save a file.  This function will be exported with the module
// https://stackoverflow.com/questions/6926016/nodejs-saving-a-base64-encoded-image-to-disk
exports.saveFile = function saveFile(name, data) {

    const base64 = data.replace(/^data:image\/([a-z]+);base64,$/, "");

    writeFile(`${name}`, base64, 'base64', (err) => {
        console.error(err);
    });
};

// Load a file from the filesystem.  This function is also exported with the module
// https://stackoverflow.com/questions/24523532/how-do-i-convert-an-image-to-a-base64-encoded-data-url-in-sails-js-or-generally
exports.loadFile = function loadFile(name) {

    const data = fs.readFileSync(name);

    return `data:image\/png;base64,${data}`;
};

module.exports = exports;
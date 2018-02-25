/**
 * Utility class for saving and retrieving picture files
 * @author Andrew Jarombek
 * @since 2/25/2018
 */

const fs = require('fs');

exports.saveFile = function saveFile(name, data) {

    const base64 = data.replace(/^data:image\/([a-z]+);base64,$/, "");

    writeFile(`${name}`, base64, 'base64', (err) => {
        console.error(err);
    });
};

exports.loadFile = function loadFile(name) {

    const data = fs.readFileSync(name);

    return `data:image\/png;base64,${data}`;
};

module.exports = exports;
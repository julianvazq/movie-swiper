import fs from 'fs';
import path from 'path';

module.exports = (io) => {
    // Full path to the current directory
    const listenersPath = path.resolve(__dirname);

    // Reads all the files in a directory
    fs.readdirSync(listenersPath).forEach((fileName) => {
        if (fileName !== 'index.ts') {
            // Requires all the files in the directory that is not a index.js.
            const listener = require(path.resolve(__dirname, fileName));
            // Initialize it with io as the parameter.
            listener(io);
        }
    });
};

/**
 * wrtieFile(localPath, urlContent) function takes in the local path and url provided by user and writes the content from given url to local path
 * @param {String} localPath - destination path to write to
 * @param {String} urlContent - content retrieved from url
 */
const fs = require('node:fs');

const writeFile = (localPath, urlContent) => {

  fs.writeFile(localPath, urlContent, (err) => {
    //Edge Case 2: Invalid localPath
    if (err) {
      console.log(`(ERR) Permission Denied: ${err.path} is an invalid path, \n${err.code}, \n${err.errno}`);
      process.exit(0);
    } else {
      console.log('\nFile Successfully Written!');
      fs.stat(localPath, (err, stats) => {
        if (err) {
          console.log(err);
        } else {
          console.log(`Downloaded and saved ${stats.size} bytes to ${localPath}`);
        }
      });
    }
  });

};

module.exports = writeFile;
/**
 * wrtieFile(localPath, urlContent) function takes in the local path and url provided by user and writes the content from given url to local path
 * @param {String} localPath - destination path to write to
 * @param {String} urlContent - content retrieved from url
 */
const fsPromises = require('fs').promises;

const writeFile = (localPath, urlContent) => {

  fsPromises.writeFile(localPath, urlContent)
    .then(() => {
      console.log('File Successfully Written!');
      return localPath;
    })
    .then((localPath) => {
      fsPromises.stat(localPath)
        .then((stats) => {
          console.log(`Downloaded and saved ${stats.size} bytes to ${localPath}`);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      //Edge Case: Invalid local path
      console.log(`(ERR) Permission Denied: ${err.path} is an invalid path`);
      process.exit(0);
    });
};


module.exports = writeFile;
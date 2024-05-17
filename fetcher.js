//Modules
const writeFile = require('./writeFile');
const needle = require('needle');
const fsPromises = require('fs').promises;
const readline = require('readline');
const { stdin: input, stdout: output } = require('node:process');
const rl = readline.createInterface({ input, output });


//Input takes: URL and local path
const userInput = process.argv.slice(2);

//Edge Case: input is greater or lesser than 2 arguments
if (userInput.length !== 2) {
  console.log("ERROR: Requires 2 arguments");
  process.exit(0);
}

const urlPath = userInput[0];
const localPath = userInput[1];

needle.get(urlPath, (err, resp, body) => {
  let urlContent;

  if (err) {
    console.log(`(ERR) Permission Denied: ${err.hostname} is an invalid path`);
    process.exit(0);
  }

  urlContent = body;

  fsPromises.readFile(localPath, 'utf-8')
    .then(() => {
      //Edge Case: file already exists
      console.log('Successfully Read File');
      rl.question(
        `You are trying to write to ${localPath} but it already exists.\nType 'Y' then Press 'Enter' to overwrite contents of ${localPath}\n`,
        (answer) => {
          if (answer === 'Y' || answer === 'y') {
            console.log(`Writing file to ${localPath}`);
            writeFile(localPath, urlContent);
          } else {
            console.log("User has chosen not to overwrite file");
            process.exit(0);
          }
          rl.close();
        });
    })
    .catch((err) => {
      //Edge Case: file doesn't exist so create file
      console.log(`Writing file to ${localPath}`);
      writeFile(localPath, urlContent);
      rl.close();
    });
});
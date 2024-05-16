//Modules
const writeFile = require('./writeFile');
const needle = require('needle');
const fs = require('node:fs');
const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');
const rl = readline.createInterface({ input, output });


//Input takes: URL and local path
const userInput = process.argv.slice(2);

//Edge Case 1: input is greater or lesser than 2 arguments
if (userInput.length !== 2) {
  console.log("Requires 2 arguments");
  process.exit(0);
}

const urlPath = userInput[0];
const localPath = userInput[1];

// Send request and get response from url
// Write urlContent to localPath
needle.get(urlPath, (error, response, body) => {
  let urlContent = '';

  //Edge Case 3: Invalid urlPath
  if (error) {
    console.log(`(ERR) Permission Denied: ${error.hostname} is an invalid path, \n${error.code}, \n${error.errno}`);
    process.exit(0);
  }
  console.log('statusCode:', response && response.statusCode);
  urlContent += body;

  //fs.stat provides details about specific file path (such as whether a file exists or not)
  //writeFile creates a file in specified directory if it does not exist. Otherwise prompts user whether to overwrite existing file or not
  fs.stat(localPath, (err) => {
    if (err) {
      writeFile(localPath, urlContent);
      rl.close();
    } else {
      //Edge 4: local Path already exists -> Prompt user
      rl.question(`You are trying to write to ${localPath} but it already exists.\nType 'Y' then Press 'Enter' to overwrite contents of ${localPath}\n`, (answer) => {

        if (answer === 'Y' || answer === 'y') {
          writeFile(localPath, urlContent);
        } else {
          console.log("User has chosen not to overwrite file");
          process.exit(0);
        }
        rl.close();
      });
    }
  });
});
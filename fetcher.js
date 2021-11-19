const request = require('request');
const fs = require('fs');

let myArgs = process.argv.slice(2);

const url = myArgs[0];
const localPath = myArgs[1];

console.log(myArgs);

const fetchFile = function(url, localPath) {
  request(url, (error, response, body) => {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
    console.log(response.statusCode);
    if (error) {
      return `Failed to get the resource from file: ${error}`;
    }
    fs.writeFile(localPath, body, (error) => {
      if (!error) {
        console.log(`Downloaded and saved ${body.length} bytes to ${localPath}`);
      } else {
        console.log(`failed to write to ${localPath}`);
      }
    });
  });
};
if (!url || !localPath) {
  console.log("Please pass in two arguments.");
  console.log("node fetcher.js <url> <localPath>");
} else {
  fetchFile(url, localPath);
}
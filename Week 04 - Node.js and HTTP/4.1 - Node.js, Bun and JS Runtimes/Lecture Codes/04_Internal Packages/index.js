// -----------------------------------
const path = require("path");

console.log(__dirname); //__dirname -> We have global access to this variable and this print current directory we are currently in.
console.log(__dirname + "/../../index.js"); // we have just added the string after the directory path -> __dirname + "/../../index.js"
console.log(path.join(__dirname, "../../index.js")); // path library will resolve this(../../);  Here we are going to go 2 folders back and then add then add that "/index.js" after that.


// -----------------------------------
const fs = require("fs");

const filePath = path.join(__dirname + "/a.txt");
fs.readFile(filePath, "utf8", function(err, data) {
    if(err) {
        console.log(err);
    } else {
        console.log(data);
    }
});

// node index.js


// npm install - we can use this command to install project dependencies from package.json and dependencies are being added to the node_modules folder/directory
// CLI - Command Line Interface
// node -h => to access node help CLI


// Thenables in JavaScript -> https://masteringjs.io/tutorials/fundamentals/thenable


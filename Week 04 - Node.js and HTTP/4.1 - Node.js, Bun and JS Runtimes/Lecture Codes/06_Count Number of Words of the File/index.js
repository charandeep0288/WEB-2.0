// basic code that would print total number of words in the file
const fs = require("fs");

function main(fileName) {
    fs.readFile(fileName, "utf-8", function(err, data) {
        let total = 0;

        for(let i = 0 ; i < data.length ; i++) {
            if(data[i] === ' ')
                total++;
        }

        console.log(total + 1);
    });
};

main("a.txt");
// main(process.args[1]); // taking in the 2th argument that we add while running a file

/**
 * Create a  `comand line interface` that lets the user specify a file path and nodejs process counts the number of words inside it.
 * 
 * Input - node index.js /Users/kirat/file.txt
 * Output - You have 10 words in this file
 * 
 * Command - `node index.js count_words filePath`
 * Command - `node index.js count_sentences filePath`
 * 
 */

// npm i fs commander

const fs = require('fs');

// const { Command } = require("commander");
// const program = new Command();
const { program } = require("commander");

program
  .name("File Related operations - Counter")
  .description("CLI to do file based tasks")
  .version("0.8.0");

program
  .command("count_words")
  .description("Count the number of words in a file")
  .argument("<file>", "file to count the number of words")
  .action((file) => {
    fs.readFile(file, "utf8", (err, data) => {
      if (err) {
        console.log(err);
      } else {
        // let words = 0;

        // for(let i = 0 ; i < words.length ; i++) {
        //   if(data[i] === ' ') words++;
        // }
        // words++;

        const words = data.split(" ").length;
        console.log(`There are ${words} words in ${file}`);
      }
    });
  });

  
program
  .command("count_sentences")
  .description("Count the number of lines in a file")
  .argument("<file>", "file to count the number of lines")
  .action((file) => {
    fs.readFile(file, "utf8", (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const lines = data.split("\n").length;
        console.log(`There are ${lines} lines in ${file}`);
      }
    });
  });

program.parse();

// npm run start count_words a.txt
// npm run start count_sentences a.txt

// alias wordcli="node index.js"

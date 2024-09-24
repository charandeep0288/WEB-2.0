// npm install chalk - external library

import chalk from 'chalk'; // mordern import sytax, promises (ES6)

console.log(chalk);



console.log(chalk.blue('Hello, world!'));
console.log(chalk.red.bold('This is an error message.'));
console.log(chalk.green.underline('This is a success message.'));


// we didn't do change in package.json file so we have to use "--experimental-modules" while running file
// Run file command -> node --experimental-modules index.mjs
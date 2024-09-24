// npm install chalk - external library

// import chalk module
import chalk from 'chalk'; // mordern import sytax, promises (ES6)
// We have to add - "type": "module" in the package.json file to run the ES6 syntax 

console.log(chalk);


console.log(chalk.blue('Hello, world!'));
console.log(chalk.red.bold('This is an error message.'));
console.log(chalk.green.underline('This is a success message.'));

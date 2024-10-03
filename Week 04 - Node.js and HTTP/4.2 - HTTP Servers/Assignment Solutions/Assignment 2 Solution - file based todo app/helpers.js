const fs = require("fs");
const path = require("path");

const todosFilePath = path.join(__dirname + "/todos-data.json");

console.log(todosFilePath);

// This is promisified version of readFile "todo-data.json"
function promisifiedReadTodosFromFile() {
    try {
        return new Promise((resolve, reject) => {
            fs.readFile(todosFilePath, 'utf8', (err, data) => {
                if (err) 
                    reject("Error while reading file: " + err);
                else {
                    data = JSON.parse(data);
                    resolve(data);
                }
            })
        })
    } catch(error) {
        console.log("Error while reading file: ", error);
        return [];
    }
}

function readTodosFromFile() {
    try {
        const data = fs.readFileSync(todosFilePath, "utf-8");
        return JSON.parse(data);
    } catch(error) {
        console.log("Error while reading file: ", error);
        return [];
    }
}

// This is promisified version of writeFile "todo-data.json"
function promisifiedWriteTodosToFile() {
    try {
        return new Promise((resolve, reject) => {
            fs.writeFile(todosFilePath, JSON.stringify(data, null, 2), "utf-8", (err) => {
                if(err) {
                    reject("Error while adding the todo.");
                } else {
                    resolve("Successfully added the todo.");
                }
            })
        });
    } catch(error) {
        console.log("Error while writting file: ", error);
    }
}

function writeTodosToFile(data) {
    try {
        fs.writeFileSync(todosFilePath, JSON.stringify(data, null, 2), "utf-8");
    } catch(error) {
        console.log("Error while writting file: ", error);
    }
}

module.exports = {
    readTodosFromFile, 
    promisifiedReadTodosFromFile,
    writeTodosToFile,
    promisifiedWriteTodosToFile
}
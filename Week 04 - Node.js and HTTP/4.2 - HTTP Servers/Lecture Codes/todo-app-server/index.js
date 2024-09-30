// We  wrote this code earlier
// const fs = require("fs");
// fs.readFile("a.txt", "utf-8", (err, data) => { // err, data - these are provided by fs library
//     console.log(data);
// });

// import express module using require function and store it in express variable
const express = require("express");

// create a express application using express function
const app = express(); // initialize the express function to use as app

console.log(express);
console.log(app);

// rote handlers
// create a route handler for GET request on the root URL '/'
app.get('/', function(req, res) { 
    // fs library also gives "err" and "data" in function argument when file is read
    // Request(req) - all things related to the request
    // Response(res) - send back data to the frontend/user


    // res.json({}); // to send some JSON data
    // res.send("<h1>hello there!</h1>"); // to send some pain text or HTML data
    res.send("Hello world!!!");
    // res.send("Hello world!!!"); // error - we can't send 2 Response back from the server
});

// create a route handler for POST request on the root URL
app.post('/', function(req, res) {
    res.send("Hello world from the post endpoint !!!");
});

app.get('/route1', function(req, res) {
    res.send("Hello Route1 !!!");
});

app.get('/about', function(req, res) {
    res.send("About Page");
});

app.listen(3000); // 3000, 3001 - which port we want to listen on 


// ----------------------------------------------------------------------------- 
// ASSIGNMENT 1. Store data in in-memory variable of the todos in the backend server
let todos = [];

// add a todo
app.post('/todo', function(req, res) {
    // create a randome id for the todo
    // extect the todo title from the body
    todos.push({
        title,
        id
    });
});

// delete todo
app.delete('/', function(req, res) {
    // extract the todo title from the body
    // remove the todo from the todos array in memory

});

// get all todos
app.post('/todos', function(req, res) {
    res.json({
        todos,
    })
});

// ----------------------------------------------------------------------------- 
// ASSIGNMENT 2. Store the data in the file, foundation for databases

// -----------------------------------------------------------------------------  
/**
 * ASSIGNMENT 3. Add user logic
 * 
 * let users = [ 1: { todos: [] }, 2: { todos: [] } ];
 * 
 */




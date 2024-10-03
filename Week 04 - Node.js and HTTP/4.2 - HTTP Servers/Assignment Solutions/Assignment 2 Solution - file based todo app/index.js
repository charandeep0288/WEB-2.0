/*
Assignment #1 - Trying to code a todo app and store data into the array
*/

// npm i express nodemon 
const express = require("express");
const { readTodosFromFile, promisifiedReadTodosFromFile, writeTodosToFile, promisifiedWriteTodosToFile } = require("./helpers");

const app = express();

app.use(express.json());

 
// Add todo endpoint
app.post("/todo", function(req, res) {
    const { title } = req.body;

    try {
        if(!title || title.trim() == "") 
            return res.status(400).json({message: "Please provide the Todo Content"});

        // read the todos from the file
        // const LOCAL_TODOS = readTodosFromFile();
        const LOCAL_TODOS = promisifiedReadTodosFromFile();

        const isTodoExisting = LOCAL_TODOS.map(todo => todo.title == title);
        if(isTodoExisting?.[0])
            return res.status(400).json({message: "Todo already exists"});
        
        const id = (new Date()).getTime();
        LOCAL_TODOS.push({
            id,
            title,
            completed: false,
        });

        // write the todos to the file
        // writeTodosToFile(LOCAL_TODOS);
        promisifiedWriteTodosToFile(LOCAL_TODOS);

        res.status(201).json({message: "Successfully Added the Todo"});
    } catch(error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Update todo title & mark-done endpoint
app.put("/todo/:id", function(req, res) {
    const { title, markDone } = req.body;
    const { id } = req.params;

    try {
        if(!id)
            return res.status(400).json({ message: "Please provide the id of todo"});

        if(!title && !markDone)
            return res.status(400).json({ message: "Please provide the Todo Content" });

        // read the todos from the file
        // const LOCAL_TODOS = readTodosFromFile();
        const LOCAL_TODOS = promisifiedReadTodosFromFile();

        const taskToBeUpdated = LOCAL_TODOS.filter(todo => todo.id == id);
        if(taskToBeUpdated.length != 0) {
            LOCAL_TODOS.map((todo) => {
                if(todo.id == id) {
                    if(title) {
                        todo.title = title;
                        
                        todo.completed = todo.completed == true && false;
                    }
                    if(markDone != undefined) todo.completed = markDone;
                }
            });

            // write the todos to the file
            // writeTodosToFile(LOCAL_TODOS);
            promisifiedWriteTodosToFile(LOCAL_TODOS);

            const updatedTodo = LOCAL_TODOS.filter(todo => todo.id == id);
            res.status(200).json({ message: "Successfully Updated the Todo", todo: updatedTodo });
        } else {
            res.status(400).json({ message: "Please provide the valid todo id" });
        }
    } catch(error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Get a todos endpoint
app.get("/todo/:id", function(req, res) {
    const { id } = req.params;
    try {
        if(!id) 
            return res.status(400).json({ message: "Please provide the id of todo"});
        
        // read the todos from the file
        // const LOCAL_TODOS = readTodosFromFile();
        const LOCAL_TODOS = promisifiedReadTodosFromFile();

        const taskToBeReturned = LOCAL_TODOS.filter(todo => todo.id == id);
        if(taskToBeReturned.length != 0) {
            res.status(200).json({ todo: taskToBeReturned });
        } else {
            res.status(400).json({ message: "Please provide the valid todo id"});
        }

    } catch(error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Get all todos endpoint
app.get("/todos", function(req, res) {
    try {
        // read the todos from the file
        // const LOCAL_TODOS = readTodosFromFile();
        const LOCAL_TODOS = promisifiedReadTodosFromFile();
        return res.status(200).json({ todos: LOCAL_TODOS });
    } catch(error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// delete all todos endpoint
app.delete("/todos", function(req, res) {
    try {
        const LOCAL_TODOS = [];
        // write the todos to the file
        // writeTodosToFile(LOCAL_TODOS);
        promisifiedWriteTodosToFile(LOCAL_TODOS);
        res.status(200).json({ message: "Successfully Deleted all Todos" });
    } catch(error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// delete a todo endpoint
app.delete("/todo/:id", function(req, res) {
    const { id } = req.params;

    try {
        if(!id) 
            return res.json({ message: "Please provide the id of todo"});

        // read the todos from the file
        // let LOCAL_TODOS = readTodosFromFile();
        let LOCAL_TODOS = promisifiedReadTodosFromFile();

        const taskToBeDeleted = LOCAL_TODOS.filter(todo => todo.id == id);
        if(taskToBeDeleted.length != 0) {
            LOCAL_TODOS = LOCAL_TODOS.filter(todo => todo.id != id);

            // write the todos to the file
            // writeTodosToFile(LOCAL_TODOS);
            promisifiedWriteTodosToFile(LOCAL_TODOS);

            res.status(200).json({ message: "Successfully Deleted the Todo"});
        } else {
            res.status(400).json({ message: "Please provide the valid todo id" });
        }
    } catch(error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Start the server on port 3000
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

// Command to run the file - if you have nodemon locally installed
// nodemon version
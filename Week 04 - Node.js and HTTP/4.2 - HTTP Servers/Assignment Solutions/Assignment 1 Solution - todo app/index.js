/*
Assignment #1 - Trying to code a todo app and store data into the array
*/

// npm i express nodemon 
const express = require("express");

const app = express();

app.use(express.json());

let TODOS = [];

// Add todo endpoint
app.post("/todo", function(req, res) {
    const { title } = req.body;

    try {
        if(!title || title.trim() == "") 
            return res.status(400).json({message: "Please provide the Todo Content"});

        const isTodoExisting = TODOS.map(todo => todo.title == title);
        if(isTodoExisting?.[0])
            return res.status(400).json({message: "Todo already exists"});
        
        const id = (new Date()).getTime();
        TODOS.push({
            id,
            title,
            completed: false,
        });

        res.status(201).json({message: "Successfully Added the Todo"});
    } catch(error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
    console.log("TODOS", TODOS);
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

        const taskToBeUpdated = TODOS.filter(todo => todo.id == id);
        if(taskToBeUpdated.length != 0) {
            TODOS.map((todo) => {
                if(todo.id == id) {
                    if(title) {
                        todo.title = title;
                        
                        todo.completed = todo.completed == true && false;
                    }
                    if(markDone != undefined) todo.completed = markDone;
                }
            });

            const updatedTodo = TODOS.filter(todo => todo.id == id);
            res.status(200).json({ message: "Successfully Updated the Todo", todo: updatedTodo });
        } else {
            res.status(400).json({ message: "Please provide the valid todo id" });
        }
    } catch(error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
    // console.log("TODOS", TODOS);
});

// Get a todos endpoint
app.get("/todo/:id", function(req, res) {
    const { id } = req.params;
    try {
        if(!id) 
            return res.status(400).json({ message: "Please provide the id of todo"});
        
        const taskToBeReturned = TODOS.filter(todo => todo.id == id);
        if(taskToBeReturned.length != 0) {
            res.status(200).json({ todo: taskToBeReturned });
        } else {
            res.status(400).json({ message: "Please provide the valid todo id"});
        }

    } catch(error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
    // console.log("TODOS", TODOS);
});

// Get all todos endpoint
app.get("/todos", function(req, res) {
    try {
        return res.status(200).json({ todos: TODOS });
    } catch(error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
    // console.log("TODOS", TODOS);
});

// delete all todos endpoint
app.delete("/todos", function(req, res) {
    try {
        TODOS = [];
        res.status(200).json({ message: "Successfully Deleted all Todos" });
    } catch(error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
    // console.log("TODOS", TODOS);
});

// delete a todo endpoint
app.delete("/todo/:id", function(req, res) {
    const { id } = req.params;

    try {
        if(!id) 
            return res.json({ message: "Please provide the id of todo"});

        const taskToBeDeleted = TODOS.filter(todo => todo.id == id);
        if(taskToBeDeleted.length != 0) {
            TODOS = TODOS.filter(todo => todo.id != id);
            res.status(200).json({ message: "Successfully Deleted the Todo"});
        } else {
            res.status(400).json({ message: "Please provide the valid todo id" });
        }
    } catch(error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
    // console.log("TODOS", TODOS);
});

// Start the server on port 3000
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

// nodemon version
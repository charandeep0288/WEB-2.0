const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const {UserModel, TodoModel} = require("./db");
const {auth, JWT_SECRET} = require("./auth");

// if database doesn't exists on this cluster, then create a new database with this name - todo-charan
mongoose.connect("mongodb+srv://charandeep0288:0gVSNaFAV2v7tfts@cluster0.2emmk.mongodb.net/todo-charan"); 

const app = express();

app.use(express.json()); // we can't parse body without this middleware - express.json()

app.post('/signup', async function(req, res) {
    const { email, password, name } = req.body;

    try {
        // Create a new user - This is a promised based function, asynchronous function
        const newUser = await UserModel.create({
            email: email,
            password: password,
            name: name,
        });

        console.log(newUser);

        res.status(201).json({
            message: "You are logged in!",
            userId: newUser._id,
        });
    } catch(error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
});

app.post('/login', async function(req, res) {
    const { email, password } = req.body;

    try {

        // we do a database call - which takes sometime, So, we should do await on this line of code
        const user = await UserModel.findOne({
            email: email,
            password: password,
        });

        console.log("user", user);

        if(user) {
            // user._id - is not string, but a ObjectId
            const token = jwt.sign({
                id: user._id.toString(),
            }, JWT_SECRET);

            res.json({
                message: "Logged in",
                token: token,
            });
        } else {
            res.status(403).json({
                message: "Incorrect credentials"
            });
        }
    } catch(error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
    
});

// End point to create a todo in the database - (authenticated)
app.post('/todo', auth, async function(req, res) {
    const userId = req.userId;
    const {title, done = false, dueDate} = req.body;

    try {
        if(!title) 
            return res.json({ message: "Please provide the Todo task!" });
        
        await TodoModel.create({
            userId,
            title,
            done,
        });
    
        res.status(201).json({
            message: "Created Todo!"
        });
    } catch(error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
    
});

// get all the todos for a user - (authenticated)
app.get('/todos', auth, async function(req, res) {
    const userId = req.userId;

    try {
        const todos = await TodoModel.find({userId});

        res.json({todos});
    } catch(e) {    
        res.status(500).json({
            message: "Internal server error",
        });
    }
});


// Start the server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// Schema - What will be the structure in which data will be stored in the database
const UserSchema = new Schema({
    name: String,
    email: {type: String, unique: true},
    password: String,
});

const TodoSchema = new Schema({
    title: String, 
    done: Boolean,
    // userId: ObjectId,
    userId: { // defining a relationship between users and todos Schema,  
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

const USER_DATABASE_NAME = 'users';
const TODOS_DATABASE_NAME = 'todos';

// We have defined the Schema above & now we want somthing on which I can call .create(), .find(), .findOne() fns in the index.js file - i.e, Model -> Data Model
// Data Model - Create a data model through which we can access the database
const UserModel = mongoose.model(USER_DATABASE_NAME, UserSchema); // 1st argument('users' collection/table) is the name of the database where data is/will be stored, 2nd argument - In which structure(Schema) I want to store data for the collection/table mentioned in 1st agrument
const TodoModel = mongoose.model(TODOS_DATABASE_NAME, TodoSchema); // todos(1st argument) - collection/table name where we want to store the data

module.exports = {
    UserModel: UserModel,
    TodoModel, 
};
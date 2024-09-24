import { program } from "commander";
import chalk from "chalk";
import fs from "fs";

// const fs = require("fs");
// const { Command } = require("commander");

const FILE_NAME = "./todos.json";

function readTodosFromfile() {
  try {
    const data = fs.readFileSync(FILE_NAME, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.log(err);
    return [];
  }
}

function writeTodosInFile(todosArr, taskType) {
  fs.writeFile(FILE_NAME, todosArr, (err, data) => {
    if (err) {
      throw err;
    } else {
      if (taskType == "add") 
        console.log("Task added!");
      else if (taskType == "delete") 
        console.log("Task removed successfully!");
      else if (taskType == "mark-done")
        console.log("Task marked as completed!");
      else if (taskType == "clear")
        console.log("Cleared all tasks successfully!");
    }
  });
}

program
  .name("Todos app")
  .description("CLI to create todos [ Your daily tasks in your terminal ] ")
  .version("1.0.0");

program
  .command("list")
  .description("list all the todos")
  .action(() => {
    fs.readFile(FILE_NAME, "utf-8", (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const todosArr = JSON.parse(data);
        if (todosArr.length == 0) {
          console.log("No Task Exist. \nPlease create a new one!");
          return;
        }

        for (let i = 0; i < todosArr.length; i++) {
          const status =
            todosArr[i].status == true
              ? chalk.green("[ Done ✓ ]")
              : chalk.yellow("[ pending ⌛ ]");
          console.log(
            todosArr[i].id + ". " + todosArr[i].task + " - " + status
          );
        }
      }
    });
  });

program
  .command("add")
  .description("Add a new todo")
  .argument("<task>", "task name")
  .action((task) => {
    const todosArr = readTodosFromfile();
    const id = (new Date()).getTime();
    const newTask = {
      id: id,
      task: task,
      status: false,
    };

    todosArr.push(newTask);
    const updatedTodosArr = JSON.stringify(todosArr);

    writeTodosInFile(updatedTodosArr, "add");
  });

program
  .command("delete")
  .description("Delete a todo")
  .argument("<id>", "id of the todo to be deleted")
  .action((id) => {
    let todosArr = readTodosFromfile();
    if (id < 1 || id > todosArr[todosArr.length - 1].id) {
      console.log("Invalid todo id. \nPlease try with different id!");
      return;
    }

    const taskToBeDeleted = todosArr.filter(todo => todo.id == id);
    if(taskToBeDeleted.length == 0) {
      console.log("Invalid todo id. \nPlease try with different id!");
      return;
    }
    
    todosArr = todosArr.filter((todo) => todo.id != id);

    const updatedTodosArr = JSON.stringify(todosArr);
    writeTodosInFile(updatedTodosArr, "delete");
  });

program
  .command("mark-done")
  .description("Mark a todo as done")
  .argument("<id>", "id of the todo to be marked as done")
  .action((id) => {
    let todosArr = readTodosFromfile();
    if (id < 1 || id > todosArr[todosArr.length - 1].id) {
      console.log("Invalid todo id. \nPlease try with different id!");
      return;
    }

    let markedAsDone = false;
    todosArr.map((todo) => {
      if (todo.id == id) {
        markedAsDone = true;
        todo.status = true;
      }
    });

    if (!markedAsDone) {
      console.log("Invalid todo id. \nPlease try with different id!");
      return;
    }

    const updatedTodosArr = JSON.stringify(todosArr);
    writeTodosInFile(updatedTodosArr, "mark-done");
  });

program
  .command("clear")
  .description("Delete all todos")
  .action(() => {
    const todos = [];
    writeTodosInFile(JSON.stringify(todos), "clear");
  });

program.parse();


// Additional resource:- https://cheatcode.co/blog/how-to-build-a-command-line-interface-cli-using-node-js#:~:text=First%2C%20from%20the%20commander%20package%20we%20import%20cli.,add%20a%20description%20and%20name%20with.description%28%29%20and.name%28%29%20respectively.
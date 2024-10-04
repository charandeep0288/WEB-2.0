/*
Create an HTTP Server
It should have 4 routes

1. http://localhost:3000/sum/12/32
2. http://localhost:3000/subtract/12/32
3. http://localhost:3000/multiply/12/32
4. http://localhost:3000/divide/12/32

Inputs given at the end of the dynamic route /:a/:b (usually used in GET requests)

The way to get them in an HTTP route is by extracting them from the `req` argument (req.params.a , req.params.b)
*/

const express = require("express");

const app = express();

// We can't send data in get request, so if we want to send data we can use something called qurey parameters, params

// http://localhost:3000/sum/12/32
app.get("/sum/:num1/:num2", function (req, res) {
    // get the values of a and b from the dynamic route and convert them to integers
    const { num1, num2 } = req.params;

    // send the subtract of a and b as a response in json format
    res.json({
      ans: parseInt(num1) + parseInt(num2),
    });
});

// http://localhost:3000/multiply/12/32
app.get("/multiply/:num1/:num2", function (req, res) {
  // get the values of a and b from the dynamic route and convert them to integers
  const { num1, num2 } = req.params;

  // send the subtract of a and b as a response in json format
  res.json({
    ans: parseInt(num1) * parseInt(num2),
  });
});

// http://localhost:3000/divide/12/32
app.get("/divide/:num1/:num2", function (req, res) {
  // get the values of a and b from the dynamic route and convert them to integers
  const { num1, num2 } = req.params;

  // send the subtract of a and b as a response in json format
  res.json({
    ans: parseInt(num1) / parseInt(num2),
  });
});

// http://localhost:3000/subtract/12/32
app.get("/subtract/:num1/:num2", function (req, res) {
  // get the values of a and b from the dynamic route and convert them to integers
  const { num1, num2 } = req.params;

  // send the subtract of a and b as a response in json format
  res.json({
    ans: parseInt(num2) - parseInt(num1),
  });
});

// Start the server on port 3000
app.listen(3000);

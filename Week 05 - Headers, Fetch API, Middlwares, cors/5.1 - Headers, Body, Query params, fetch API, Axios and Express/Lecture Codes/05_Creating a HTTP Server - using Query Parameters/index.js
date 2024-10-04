/*
Create an HTTP Server
It should have 4 routes

1. http://localhost:3000/sum?a=1&b=2
2. http://localhost:3000/subtract?a=1&b=2
3. http://localhost:3000/multiply?a=1&b=2
4. http://localhost:3000/divide?a=1&b=2

Inputs given at the end after `?` are known as query parameters (usually used in GET requests)

The way to get them in an HTTP route is by extracting them from the `req` argument (req.query.a , req.query.b)
*/

const express = require("express");

const app = express();

// We can't send data in get request, so if we want to send data we can use something called qurey parameters, params

// http://localhost:3000/sum?a=1&b=2
app.get("/sum", function (req, res) {
  // get the values of a and b from the query parameters and convert them to integers
  const a = parseInt(req.query.a); // "1" we usually get data from frontend in query parameters as string, so we need to convert it to int/number using parseInt fn
  const b = parseInt(req.query.b); // "2"

  // send the sum of a and b as a response in json format
  res.json({
    ans: a + b,
  });
});

// http://localhost:3000/multiply?a=11&b=20
app.get("/multiply", function (req, res) {
  // dynamic endpoint
  // get the values of a and b from the query parameters and convert them to integers
  const a = parseInt(req.query.a); // we can also remove parseInt and use req.query.a directly
  const b = parseInt(req.query.b);

  // send the multiply of a and b as a response in json format
  res.json({
    ans: a * b,
  });
});

// http://localhost:3000/divide?a=10&b=2
app.get("/divide", function (req, res) {
  // get the values of a and b from the query parameters and convert them to integers
  const a = parseInt(req.query.a); // we can also remove parseInt and use req.query.a directly
  const b = parseInt(req.query.b);

  // send the divide of a and b as a response in json format
  res.json({
    ans: a / b,
  });
});

// http://localhost:3000/subtract?a=10&b=20
app.get("/subtract", function (req, res) {
  // get the values of a and b from the query parameters and convert them to integers
  const a = parseInt(req.query.a);
  const b = parseInt(req.query.b);

  // send the subtract of a and b as a response in json format
  res.json({
    ans: b - a,
  });
});

// Start the server on port 3000
app.listen(3000);

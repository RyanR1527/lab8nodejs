"use strict";



const express = require('express');
const app = express();

let messages = [
  { id: 1, text: "Welcome to the message board!", author: "Admin" },
];

let nextId = 2;

// Serve static files from the 'public' folder
app.use(express.static('public'));

// Parse JSON request bodies (needed for POST)
app.use(express.json());

// ---- Your endpoints go below this line ----
app.get('/hello', (req, res) => {
  res.type('text').send('Hello from the server!');
});
app.get('/api/time', (req, res) => {
  res.type('json').send('{"current time": "${new Date().toISOString()"}')
});

app.get('/api/greet/:name', (req, res) => {
  res.type('json').send('{"greeting": "Hello, ${req.params.name}! Welcome to the API.');
});
app.get('/api/slow', (req, res) => {
  setTimeout(() => {
    res.json({
      message: "Sorry for the wait!",
      delayMs: 3000
    });
  }, 3000);
});
app.get('/api/unreliable', (req, res) => {
  const rand = Math.random();
  if (rand < 0.5) {
    res.status(500).json({
      error: "Server had a bad day. Try again!"
    });
  } else {
    res.json({
      message: "Lucky! It worked this time.",
      luckyNumber: Math.floor(Math.random() * 100)
    });
  }
});
app.post('/api/messages', (req, res) => {
text = req.query.text;
 

});
app.get('/api/math', (req, res) => {
  let a = Number(req.query.a);
  let b = Number(req.query.b);
  let operation = req.query.operation;
  let sum = 0;
  if(b == 0)
    res.status(400).json({ error: 'division by zero' });
  
  if(operation === 'add')
    sum=a+b;
  if(operation === 'divide')
    sum=a/b;
  if(operation === 'subtract')
    sum=a-b;
  if(operation == null)
    res.status(400).json({ error: 'missing operation' });
   
    res.type('json').send({a, b, operation, sum});
});
// ---- Your endpoints go above this line ----

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});




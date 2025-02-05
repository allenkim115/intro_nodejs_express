const express = require('express');
const app = express();
const port = 3000;
const items = ['Apple', 'Banana', 'Orange'];

//serve static files
app.use(express.static('public'));

//Define the route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/about', (req, res) => {
  res.send('About Us');
});

app.use(express.json());//Middleware to parse incoming JSON bodies

app.post('/submit', (req, res) => {
  const data = req.body;
  res.send(`Received: ${JSON.stringify(data)}`);
});

app.use((req, res, next) => {
  console.log(`$req.method} ${req.url}`);
  next();
}); 

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.get('/items', (req, res) => {
  res.json(items);
});

app.post('/items', (req, res) => {
  const newItem = req.body.item;
  items.push(newItem);
  res.json(items);
});

//Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
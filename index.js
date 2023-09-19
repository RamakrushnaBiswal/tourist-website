const express = require('express');
const path = require('path');
const mysql = require('mysql2'); // Import the mysql2 library
const app = express();
const port = process.env.PORT || 3000;

// Create a MySQL database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'test'
});

// Connect to the MySQL database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

app.use(express.static('public'));

app.use('/', require(path.join(__dirname, 'routes/blog.js')));
app.use('/contact', require(path.join(__dirname, 'routes/blog.js')));
app.use('/about', require(path.join(__dirname, 'routes/blog.js')));
app.use('/locations', require(path.join(__dirname, 'routes/blog.js')));
app.use('/register', require(path.join(__dirname, 'routes/blog.js')));

app.listen(port, () => {
  console.log(`Mr Traveller app listening on port ${port}`);
});

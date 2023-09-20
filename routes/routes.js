const express = require('express');
const path = require('path');
const router = express.Router();
const mysql = require('mysql2/promise');

const userdata = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'test'
});

userdata.getConnection()
  .then((connection) => {
    console.log('Database connected successfully!');
    connection.release(); // Release the connection
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err);
  });

router.use(express.urlencoded({ extended: true }));

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../templates/index.html'));
});

router.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, '../templates/contact.html'));
});

router.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, '../templates/about.html'));
});

router.get('/locations', (req, res) => {
  res.sendFile(path.join(__dirname, '../templates/locations.html'));
});

router.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '../templates/register.html'));
});
router.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, '../templates/index.html'));
});
router.get('/success', (req, res) => {
    res.sendFile(path.join(__dirname, '../templates/success.html'));
});
router.post('/register', async (req, res) => {
    const { name, email, phone, age, mygender, departuredate, returndate, destination, locations, t_and_c } = req.body;

    // for debug debug
    // console.log('Received data:', { name, email, phone, age, mygender, departuredate, returndate, destination, locations, t_and_c });

    try {
        const connection = await userdata.getConnection();
         const destinationString = destination.join(', ');
        const [rows, fields] = await connection.execute(
            'INSERT INTO users (name, email, phone, age, gender, departure_date, return_date, destination, package, terms_and_conditions) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [name, email, phone, age, mygender, departuredate, returndate, destinationString, locations, t_and_c]
        );        
        connection.release(); 

        res.redirect('./success');
    } catch (error) {
        console.error('Error inserting user data into the database:', error);
        res.status(500).send('Registration failed. Please try again later.');
    }
});
module.exports = router;

const express = require('express');
const path = require('path');
const router = express.Router();
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

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
router.get('/submit', (req, res) => {
    res.sendFile(path.join(__dirname, '../templates/contact.html'));
});
router.get('/thankyou', (req, res) => {
    res.sendFile(path.join(__dirname, '../templates/thank.html'));
});
router.get('/health', (req, res) => {
    res.sendFile(path.join(__dirname, '../templates/health.html'));
});
router.get('/food', (req, res) => {
    res.sendFile(path.join(__dirname, '../templates/food.html'));
});
router.get('/hotel', (req, res) => {
    res.sendFile(path.join(__dirname, '../templates/hotel.html'));
});
router.get('/total', (req, res) => {
    res.sendFile(path.join(__dirname, '../templates/total.html'));
});
router.get('/travel', (req, res) => {
    res.sendFile(path.join(__dirname, '../templates/travel.html'));
});
router.get('/policy', (req, res) => {
    res.sendFile(path.join(__dirname, '../templates/policy.html'));
});
router.get('/review', (req, res) => {
    res.sendFile(path.join(__dirname, '../templates/review.html'));
});
router.get('/offlinemap', (req, res) => {
    res.sendFile(path.join(__dirname, '../templates/offlinemap.html'));
});
router.get('/tour', (req, res) => {
    res.sendFile(path.join(__dirname, '../templates/tour.html'));
});
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../templates/login.html'));
});
router.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '../templates/signup.html'));
});
router.post('/register', async (req, res) => {
    const { name, email, phone, age, mygender, departuredate, returndate, destination, locations, t_and_c } = req.body;

    // for debug
    // console.log('Received data:', { name, email, phone, age, mygender, departuredate, returndate, destination, locations, t_and_c });

    try {
        const connection = await userdata.getConnection();
        //if user input more than one destination
        const destinationString = Array.isArray(destination) ? destination.join(', ') : destination;  
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
router.post('/submit', (req, res) => {
  const { myname, email, subject, message } = req.body;

  // Insert the form data into the database using SQL queries and promises
  const sql = 'INSERT INTO contact_form(name, email, subject, message) VALUES (?, ?, ?, ?)';
  
  userdata.execute(sql, [myname, email, subject, message])
    .then(() => {
      // Handle success (e.g., send a response to the user)
      res.redirect('./thankyou');
    })
    .catch((err) => {
      // Handle error (e.g., send an error response)
      console.error('Error submitting form:', err);
      res.status(500).send('Internal Server Error');
    });
});

router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
      // Hash the password using bcrypt
      const hashedPassword = await bcrypt.hash(password, 10); // Adjust the saltRounds value as needed

      // Insert the user into the database
      const [rows, fields] = await userdata.execute(
          'INSERT INTO myusers (name, email, password) VALUES (?, ?, ?)',
          [name, email, hashedPassword]
      );

      res.redirect('./success');
  } catch (error) {
      console.error('Error inserting user data into the database:', error);
      res.status(500).send('Registration failed. Please try again later.');
  }
});

// Handle user login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
      // Get a connection from the pool
      const connection = await userdata.getConnection();

      // Query the database to check if the user exists
      const [rows] = await connection.query('SELECT * FROM myusers WHERE email = ?', [email]);

      // Release the connection back to the pool
      connection.release();

      if (rows.length === 0) {
          // User not found
          return res.status(404).json({ message: 'User not found' });
      }

      const user = rows[0];

      // Compare the hashed password using bcrypt
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
          // Successful login
          return res.redirect('./home');
      } else {
          // Incorrect password
          return res.status(401).json({ message: 'Incorrect password' });
      }
  } catch (error) {
      console.error('Error in login:', error);
      return res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;

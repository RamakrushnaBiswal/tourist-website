const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
app.use(express.static('public'));

app.use('/', require(path.join(__dirname, 'routes/routes.js')));
app.use('/contact', require(path.join(__dirname, 'routes/routes.js')));
app.use('/about', require(path.join(__dirname, 'routes/routes.js')));
app.use('/locations', require(path.join(__dirname, 'routes/routes.js')));
app.use('/register', require(path.join(__dirname, 'routes/routes.js')));
app.use('/home', require(path.join(__dirname, 'routes/routes.js')));
app.use('/success', require(path.join(__dirname, 'routes/routes.js')));
app.use('/submit', require(path.join(__dirname, 'routes/routes.js')));
app.use('/thankyou', require(path.join(__dirname, 'routes/routes.js')));
app.use('/health', require(path.join(__dirname, 'routes/routes.js')));
app.use('/food', require(path.join(__dirname, 'routes/routes.js')));
app.use('/hotel', require(path.join(__dirname, 'routes/routes.js')));
app.use('/total', require(path.join(__dirname, 'routes/routes.js')));
app.use('/travel', require(path.join(__dirname, 'routes/routes.js')));
app.use('/policy', require(path.join(__dirname, 'routes/routes.js')));
app.use('/review', require(path.join(__dirname, 'routes/routes.js')));
app.use('/offlinemap', require(path.join(__dirname, 'routes/routes.js')));
app.use('/tour', require(path.join(__dirname, 'routes/routes.js')));

app.listen(port, () => {
  console.log(`Mr Traveller app listening on port ${port}`);
});

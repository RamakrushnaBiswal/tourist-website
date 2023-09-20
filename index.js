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
app.listen(port, () => {
  console.log(`Mr Traveller app listening on port ${port}`);
});

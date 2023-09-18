const express = require('express')
const path = require('path')
const app = express()
const port = process.env.PORT || 3000

app.use(express.static('public'));
// app.use(express.static(path.join(__dirname,"static")))//accessing data from a folder
app.use('/',require(path.join(__dirname,"routes/blog.js")))//folder .js file
app.use('/contact',require(path.join(__dirname,"routes/blog.js")))
app.use('/about',require(path.join(__dirname,"routes/blog.js")))
app.use('/locations',require(path.join(__dirname,"routes/blog.js")))
app.use('/register',require(path.join(__dirname,"routes/blog.js")))


app.listen(port, () => {
  console.log(`Mr Traveller app listening on port ${port}`)
})
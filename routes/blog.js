const express = require('express')
const path = require('path')//path function
const router = express.Router();


router.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'../templates/index.html'))//use '../' because templates/index.html outside of the routes folder 
})
router.get('/contact',(req,res)=>{
    res.sendFile(path.join(__dirname,'../templates/contact.html'))
})
router.get('/about',(req,res)=>{
    res.sendFile(path.join(__dirname,'../templates/about.html'))
})
router.get('/locations',(req,res)=>{
    res.sendFile(path.join(__dirname,'../templates/locations.html'))
})
router.get('/register',(req,res)=>{
    res.sendFile(path.join(__dirname,'../templates/register.html'))

})
// router.post('/', async(req, res) => {
//     const formData = req.body;
//     const registration = new Registration(formData)  
//     try {
//         const savedRegistration = await registration.save();
//         console.log('Saved Registration:', savedRegistration);
//         res.status(200).send('Registration submitted successfully.');
//       } catch (error) {
//         console.error('Error saving registration:', error);
//         res.status(500).send('Error submitting registration.');
//       }
//   })
  module.exports =  router;

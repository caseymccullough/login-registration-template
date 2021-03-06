const router = require ('express').Router(); 
const User = require ('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../validation');

router.post('/register', async (req, res) => {

   // LET'S VALIDATE THE DATA BEFORE WE CREATE A USER
   const { error } = registerValidation(req.body);
   if(error) return res.status(400).send(error.details[0].message);

   // Check if user is already in db
   const emailExists = await User.findOne({email: req.body.email});
   if (emailExists) return res.status(400).send('Email already exists');

   // hash the password
   const salt = await bcrypt.genSalt(10); // salt combines with password. 
                                          // Only bcrypt can resolve

   const hashedPassword = await bcrypt.hash(req.body.password, salt);

   const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
   });
   try{
      const savedUser = await user.save();
      res.send({user: user._id}); // don't want to send entire object as it contains password
   } catch(err){
      res.status(400).send(err);
   }
});

// LOGIN
router.post('/login', async (req, res) => {
   //  VALIDATE THE DATA 
   const { error } = loginValidation(req.body);
   if(error) return res.status(400).send(error.details[0].message);
   
   // Confirm that email exists
   const user = await User.findOne({email: req.body.email});
   if (!user) return res.status(400).send('Email is not found');

   // Check if password is correct
   const validPass = await bcrypt.compare(req.body.password, user.password);
   if (!validPass) return res.status(400).send('Invalid password');

   // Create and assign a token
   const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
   // only the backend knows TOKEN_SECRET
   res.header('auth-token', token).send(token);

});

module.exports = router;
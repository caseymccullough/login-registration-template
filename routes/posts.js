const router = require('express').Router(); 
const User = require('../models/User');
const verify = require('./verifyToken');

router.get('/', verify, async (req, res) => {
   res.send(req.user._id);
   const currentUser = await User.findById(req.user._id);
   console.log(currentUser);

});

module.exports = router; 
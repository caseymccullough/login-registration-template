/*
   placed here solely to illustrate a protected (private) route
*/

const router = require('express').Router();
const verify = require('./verifytoken');

router.get('/', verify, (req, res) => { // note verify method is tucked in here.
   res.json({
      secrets: {
         title: 'my first secret',
         description: 'data you may not access'
      }
   });
});

module.exports = router; 
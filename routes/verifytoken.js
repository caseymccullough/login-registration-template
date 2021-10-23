const jwt = require('jsonwebtoken');

// we can make any route protected by adding this route to it
// token is assigned when user logs in. This checks to see if user has a 
// valid token


module.exports = function auth (req, res, next){
   const token = req.header('auth-token');
   if (!token) return res.status(401).send('Access Denied'); // no token

   // has token, try to verify
   try{ 
      const verified = jwt.verify(token, process.env.TOKEN_SECRET); // verified will send id back if there's a match
      req.user = verified;
      next(); 
   }catch (err) {
      res.status(400).send('Invalid Token');
   }

} 
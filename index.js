const express = require ('express');
const app = express(); 
const mongoose = require('mongoose');
const dotenv = require('dotenv');
// Import Routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts')
const secretsRoute = require('./routes/secrets');


dotenv.config();

// Connect to DB
mongoose.connect (
   process.env.DB_CONNECT,
   { useNewUrlParser: true },
   () => console.log ("Connected to DB")
);


// Middleware 
app.use (express.json());
// Route middlewares
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);

app.use('/api/secrets', secretsRoute);

app.listen(3000, () => console.log ("Server up and running"));

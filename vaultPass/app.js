const express = require('express');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const connectDB = require('./config/db');

// importing the diff routes
const publicRoutes = require('./src/routes/publicRoutes');
const userRoutes = require('./src/routes/userRoutes');
const moderatorRoutes = require('./src/routes/moderatorRoutes');
const adminRoutes = require('./src/routes/adminRoutes');

// middleware
ap.use(express.json());
app.use(morgan('dev'));

const PORT = process.env.PORT || 6000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Using the routes when a request comes.

app.use('/api/public', publicRoutes);
app.use('/api/user', userRoutes);
app.use('/api/moderator', moderatorRoutes);
app.use('/api/admin', adminRoutes);



app.listen(port, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});
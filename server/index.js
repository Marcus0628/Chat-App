const express = require('express');
const cors = require('cors');
const router = require('./routes/route');
const connectDB = require('./config/connectDB');
require('dotenv').config();
const cookiesParser = require('cookie-parser');
const { app, server } = require('./socket/index');

//const app = express();

const port = process.env.PORT || 8081;

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookiesParser());

app.use('/api', router);

app.get('/', (req, res) => {
  res.send('Welcome to Chat App');
});

connectDB().then(() => {
  console.log('Connected to database!!');
  server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});

module.exports = app;

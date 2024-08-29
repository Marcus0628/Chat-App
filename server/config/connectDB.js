const mongoose = require('mongoose');

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const connection = mongoose.connection;

    connection.on('connected', () => {
      console.log('Connected to database!');
    });

    connection.on('error', (error) => {
      console.log(`Somthing went wrong in mongoDB, ${error}`);
    });
  } catch (error) {
    console.log('Connect to database failed!');
    console.log(error);
  }
}

module.exports = connectDB;

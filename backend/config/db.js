const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // --- DEBUG LINE: This prints the exact URI your code is seeing ---
    console.log("Attempting to connect to:", process.env.MONGO_URI); 
    // ---------------------------------------------------------------

    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
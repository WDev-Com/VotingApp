const mongoose = require("mongoose");
const { MONGO_URL } = process.env;

// connection to the database
const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB Atlas connection successful");
  } catch (error) {
    console.error("Error connecting to MongoDB Atlas:", error.message);
  }
};

// Call the function to establish the connection
connectToDatabase();

// Export the function if needed
module.exports = connectToDatabase;

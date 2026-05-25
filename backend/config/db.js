const mongoose = require("mongoose");

const connectDB = async (retries = 5) => {
  for (let i = 0; i < retries; i++) {
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 5000,
      });

      console.log("MongoDB Connected ✅");
      return;

    } catch (error) {
      console.error(`MongoDB connection attempt ${i + 1} failed:`, error.message);
      
      if (i === retries - 1) {
        console.error("\n⚠️  CRITICAL: Could not connect to MongoDB Atlas");
        console.error("ACTION REQUIRED: Whitelist your IP in MongoDB Atlas");
        console.error("1. Go to: https://cloud.mongodb.com/");
        console.error("2. Select your cluster");
        console.error("3. Go to Network Access > IP Whitelist");
        console.error("4. Add your current IP address (or 0.0.0.0/0 for development)");
        console.error("\nServer will continue running without MongoDB.\n");
        return;
      }
      
      console.log(`Retrying in 3 seconds... (${retries - i - 1} attempts remaining)`);
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }
};

module.exports = connectDB;
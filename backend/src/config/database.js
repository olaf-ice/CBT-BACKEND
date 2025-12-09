import mongoose from "mongoose";

const connectDB = async() => {
    try { 
           console.log("Connecting to MongoDB with URI:", process.env.MONGODB_URI?.substring(0, 50) + "...");
           
           const connectionInstance = await mongoose.connect(process.env.MONGODB_URI, {
               connectTimeoutMS: 5000,
               serverSelectionTimeoutMS: 5000,
               socketTimeoutMS: 5000,
           });
           console.log(`MongoDB connected !!! DB HOST: ${connectionInstance.connection.host}`);
           return connectionInstance;

     } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        console.error('Full error:', error);
        throw error;
     }

}

export default connectDB;


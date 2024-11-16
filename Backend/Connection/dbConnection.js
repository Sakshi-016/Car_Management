import mongoose from "mongoose";

const dbConnection=async()=>{
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected successfully")
  } catch (error) {
   console.log("Databse connection error",error) 
  }
}


export default dbConnection
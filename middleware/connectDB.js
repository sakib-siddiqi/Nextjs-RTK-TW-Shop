import mongoose from "mongoose";

let URL =
  process.env.NODE_ENV === "development"
    ? "mongodb://localhost:27017/DOT-shop"
    : process.env.DB_URL;

const connectDB = async () => {
  // Use new db connection
  console.log(URL);
  return mongoose.connect(process.env.DB_URL);
};

export default connectDB;

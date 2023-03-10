import mongoose from "mongoose";

let URL =
  process.env.NODE_ENV === "development"
    ? "mongodb://localhost:27017/DOT-shop"
    : process.env.DB_URL;

const connectDB = async () => {
  // Use new db connection
  mongoose.set("strictQuery", false);
  return await mongoose.connect(URL);
};

export default connectDB;

import mongoose from "mongoose";

let URL =
  process.env.NODE_ENV === "development"
    ? "mongodb://localhost:27017/DOT-shop"
    : process.env.DB_URL;

const connectDB = async () => {
  // Use new db connection
  console.log("🎁 DATABSE URL 🎁 ---> : ", URL);
  mongoose.set("strictQuery", false);
  return await mongoose.connect("mongodb://localhost:27017/DOT-shop");
};

export default connectDB;

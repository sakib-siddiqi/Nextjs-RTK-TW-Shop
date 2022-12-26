import mongoose from "mongoose";

export default async function db_connector() {
  let URL =
    process.env.NODE_ENV === "development"
      ? "mongodb://localhost:27017/DOT-shop"
      : "mongodb://localhost:27017/DOT-shop" || process.env.DB_URL;
  try {
    return mongoose.connect("URL");
  } catch (error) {
    console.log(error.message);
    return;
  }
}

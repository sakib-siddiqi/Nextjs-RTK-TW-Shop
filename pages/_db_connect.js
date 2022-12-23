import mongoose from "mongoose";

export default async function db_connector() {
  let URL = process.env.DB_URL;
  return mongoose.connect(URL);
}

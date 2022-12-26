import mongoose from "mongoose";

let URL =
  process.env.NODE_ENV === "development"
    ? "mongodb://localhost:27017/DOT-shop"
    : process.env.DB_URL;

const connectDB = async () => {
  // Use new db connection
  return mongoose.connect(URL, {
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useNewUrlParser: true,
  });
};

export default connectDB;

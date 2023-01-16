import { model, models, Schema } from "mongoose";
import { isEmail, isPassword } from "../utils/validator";

const userSchema = new Schema({
  name: {
    type: String,
    minLen: [3, "{VALUE} length is less then 3."],
    require: true,
    unique:true
  },
  password: {
    type: String,
    require: [true, "Password is required."],
    validate: {
      validator: isPassword,
      message: "Invalid password.",
    },
  },
  email: {
    type: String,
    require: [true, "Email is required."],
    unique:[true,"{VALUE} is already in use. try another email."],
    validate: {
      validator: isEmail,
      message: "Email is invalid.",
    },
  },
});
userSchema.pre("save", function (next) {
  if (
    !this &&
    [...Object.keys(this)].find((e) => e === ("name" || "email" || "password"))
  )
    return new Error("User body is invalid.");
  // else if (!isEmail(this.email)) throw new Error("Email is invalid.");
  // else if (!isPassword(this.password)) throw new Error("Password is invalid.");
  next();
});

const User = models.users || model("users", userSchema);
export default User;

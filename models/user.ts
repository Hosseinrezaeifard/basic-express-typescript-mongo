import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
});

let User = mongoose.model("User", userSchema);

export default User;

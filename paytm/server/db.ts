import mongoose from "mongoose";

mongoose.connect(
  `mongodb+srv://arnav:arnavsharma1A@cluster0.n9borfi.mongodb.net/paytm`,
);
const Users = mongoose.model(`user`, {
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
});

export const Accounts = mongoose.model(`account`, {
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});
export default Users;

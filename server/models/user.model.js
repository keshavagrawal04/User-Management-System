const mongoose = require("mongoose");

// SCHEMA : User Schema
const userSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      require: true,
    },
    age: {
      type: Number,
    },
    contactNumber: {
      type: Number,
      require: true,
      length: 10,
    },
    profileImage: {
      type: String,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      hash: {
        type: String,
      },
      salt: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);

const mongoose = require("mongoose");

// FUNCTION : Connect With MongoDb Using Mongoose
const connect = async () => {
  try {
    const connection = await mongoose.connect(
      `${process.env.MONGODB_URI}/${process.env.DB_NAME}`
    );
    console.log(
      `[Server] Mongo DB Connection Successfully Established ${connection.connection.host}`
    );
  } catch (error) {
    throw error;
  }
};

module.exports = {
  connect,
};

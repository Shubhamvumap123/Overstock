const mongoose = require("mongoose");
require("dotenv").config();
module.exports = () => {
  return mongoose.connect(
    "mongodb+srv://krunal:krunal28@cluster0.mzqmfd7.mongodb.net/?retryWrites=true&w=majority"
  );
};

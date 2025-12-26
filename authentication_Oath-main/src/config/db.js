const mongoose =require("mongoose");
module.exports = () => {
    return mongoose.connect(process.env.DB_URL);
};
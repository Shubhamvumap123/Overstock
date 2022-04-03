const mongoose = require("mongoose");

module.exports = () => {
    return mongoose.connect("mongodb+srv://shubham123:12Shubh34@cluster0.0wzjl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
};

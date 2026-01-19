
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const userSchema = new mongoose.Schema({
    email: {type : String, required : true, unique:true},
    password : {type : String, required : true}
},{
    timestamps : true,
    versionKey : false,
})

userSchema.pre("save", async function(next){
    if (!this.isModified("password")) return next();
    try {
        const hash = await bcrypt.hash(this.password, 10);
        this.password = hash;
        return next();
    } catch (err) {
        return next(err);
    }
})

userSchema.methods.checkPassword = function(password){
    return bcrypt.compare(password, this.password);
}

const User = mongoose.model("user", userSchema)

module.exports = User;



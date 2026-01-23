const mongoose = require("mongoose");
const bcrypt =require("bcrypt");
const userSchema = new mongoose.Schema({
    name:{type:String, required:false},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    role:[{type:String}],
},{
    timestamps:true,
    versionKey:false,
});


userSchema.pre("save", async function(next){
    // Sentinel Fix: Prevent re-hashing if not modified
    if (!this.isModified("password")) return next();

    // Sentinel Fix: Use async hash to prevent blocking event loop
    try {
        const hash = await bcrypt.hash(this.password, 10);
        this.password = hash;
        return next();
    } catch(err) {
        return next(err);
    }
})

userSchema.methods.checkPassword = function (password) {
    // Sentinel Fix: Use async compare to return a Promise
    return bcrypt.compare(password, this.password);
}


module.exports = mongoose.model("user",userSchema);

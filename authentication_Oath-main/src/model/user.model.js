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


userSchema.pre("save", async function(){
   
    // Security: Only hash the password if it has been modified (or is new)
    if (!this.isModified("password")) return;

    try {
        const hash = await bcrypt.hash(this.password, 10);
        this.password = hash;
    } catch (err) {
        throw err;
    }

})

userSchema.methods.checkPassword = function (password) {

    return bcrypt.compare(password, this.password)
}


module.exports = mongoose.model("user",userSchema);
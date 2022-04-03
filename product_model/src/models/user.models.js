const mongoose = require('mongoose');

const livingRoomSchema = new mongoose.Schema(
    {
       name:{type:String, required:true},
       price:{type:Number, required:true},
       imageURL:{type:String, required:true},
       img1:{type:String, required:false, multiple:true},
       img2:{type:String, required:false, multiple:true},
       img3:{type:String, required:true, multiple:true},
       img4:{type:String, required:true, multiple:true},
       rating:{type: Number, required: false},

    //   color:{type:String, required:true},
    },
    {
        versionKey:false,
        timestamps:true,
    }
)
module.exports = mongoose.model('livingroom',livingRoomSchema)
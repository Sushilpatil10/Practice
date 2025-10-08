const mongoose  =require('mongoose');

const UserSchema  =mongoose.Schema({
    name: String,
    email:String,
    phone_no :Number,
    birth_date:String,
    password:String

})

const User =mongoose.model('User',UserSchema)

module.exports =User;
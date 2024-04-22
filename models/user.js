const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    user_name:{type:String, unique:true},
    password:{type:String, required:true}
})

const User = mongoose.model('User',userSchema,'users')

// const u1 = new User({user_name:"john",password:"john123"})
// u1.save((error,result)=>{
//     if(error)
//         console.log(error)
//     else
//         console.log(result)
// })
module.exports = User
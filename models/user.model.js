const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const bcrypt = require("bcrypt")

const userSchema = new  Schema({
    name:{
        type:String,
        required:true,
        trim : true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim : true
    },
    password:{
        type:String,
        required:true,
        trim : true
    },
    address:{
        type:String,
        required:true,
        trim : true
    },
    nationlId:{
        type:String,
        required:true,
        trim : true
    },
    phone:{
        type:String,
        required:true,
        trim : true
    },
})

userSchema.pre("save", async function(next){
    try{
        let user = this  // ==> document
        if(!user.isModified("password")){
            return next( )
        }
        let hashedpassword = await bcrypt.hash(user.password , 8)
        user.password = hashedpassword
        next()
    }
    catch(error){
        next(error)
    }
})
userSchema.methods.comparePassword = async function(password){
    return bcrypt.compare(password,this.password)
}
const User = mongoose.model("User", userSchema)
module.exports = User;

// methods ==> relation document & لها علاقة مباشرة مع document

// statics ==> relation class not document & لعاقتها المباشره مع model  تتعامل مع array
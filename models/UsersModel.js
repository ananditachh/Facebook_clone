const mongoose =  require('mongoose')
const Schema = mongoose.Schema
const opts = { toJSON: { virtuals: true } }


const Userschema = new Schema({
    name:{
        type:String,
        required:true,
        lowercase:true
    },
    lastname:{
        type:String,
        required:true,
        lowercase:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password: {
        type:String,
        required:true,       
    },
    avatar:{
        type:String
    },
    resetToken:{
        type:String
    },
    expireToken:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    }
    
},opts)

Userschema.virtual('fullname')
.get(function() {
    try {
    this.firstName = this.name.charAt(0).toUpperCase() + this.name.slice(1)
    this.lastName = this.lastname.charAt(0).toUpperCase() + this.lastname.slice(1)
    //this.firstName = this.name[0].toUpperCase() + this.name.substring(1);
    //this.lastName = this.lastname[0].toUpperCase() + this.lastname.substring(1);
    return `${this.firstName} ${this.lastName}`
   }
   catch(err){
       logger.error(err)
   }
})

const User = mongoose.model('users',Userschema);
module.exports = User;
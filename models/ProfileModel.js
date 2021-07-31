const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  city:{
    type:String
  },
  bio:{
    type:String
  },
  profilepic:{
    type:String
  },
  coverpic:{
    type:String
  },
  workplace:{
    type:String
  },
  school:{
    type:String
  },
  hobbies:{
    type:[String]
  },
  followers: [
    { 
      user: 
      {
      type: Schema.Types.ObjectId,
      ref: 'users'
    }
     
  }
  ],
  following : [
    { 
      user: 
      {
      type: Schema.Types.ObjectId,
      ref: 'users'
    }
  }
],
saved:[
  {    
  savedpost:
  {  
      type: Schema.Types.ObjectId,
      ref: 'posts'
  },
}  
] 
})

module.exports = Profile = mongoose.model('profile', ProfileSchema);
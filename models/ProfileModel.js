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
  followers: [
    {
      type: Schema.Types.ObjectId,
    ref: 'users'
  }
  ],
  following : [
    { 
      type: Schema.Types.ObjectId,
      ref: 'users'
    } 
]

  
})

module.exports = Profile = mongoose.model('profile', ProfileSchema);
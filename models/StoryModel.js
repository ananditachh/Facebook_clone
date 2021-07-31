const mongoose =  require('mongoose')
const Schema = mongoose.Schema

const StorySchema = new Schema ({
    
        postedbyuser: {
            type: Schema.Types.ObjectId,
            ref: 'users'
          },
          text: {
            type: String
            
          },
          image:{
              type:String
          },
          expire_at: {
            type: Date,
            default: Date.now(),
            expires: 1800
        }
    }, { timestamps: true 
    
    }    

);

StorySchema.index({ "expire_at": 1 }, { expireAfterSeconds: 1800 });

module.exports = Story = mongoose.model('story', StorySchema);


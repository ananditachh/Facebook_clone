const express = require('express');
const _route = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const Profile = require("../../models/ProfileModel");
// Load User Model
const User = require("../../models/UsersModel");

_route.get('/test',(req,res) => res.json({
    msg:'Profile route works'
}))

// @route   GET api/profile
// @desc    Get current users profile
// @access  Private

_route.get('/',
            passport.authenticate("jwt", { session: false }),
            (req,res) => {
                const errors = {};
                Profile.findOne({user:req.user.id})
                .populate("user","name lastname avatar")
                .then(profile => {
                    if(!profile) {
                        errors.noprofile = "There is no profile for this user"
                        return res.status(404).json(errors)
                    }
                    res.json(profile)
                })
                .catch(err => {
                    logging.error(`Error in profile creation : ${err}`)
                    res.status(404).json(err)
                })                       
            }
)

// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public
_route.get("/all", (req, res) => {
    const errors = {};
  
    Profile.find({})
      .populate("user", ["name","lastname", "avatar"])
      .then((profiles) => {
        if (profiles.length == 0) {
          errors.noprofile = "There are no profiles";
          return res.status(404).json(errors);
        }
  
        res.json(profiles);
      })
      .catch((err) => res.status(404).json(err));
  });

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public
_route.get('/user/:user_id',(req,res) => {
    const errors = {}
    Profile.findOne({user:req.params.user_id})
    .populate("user", ["name","lastname", "avatar"])
    .then(profile => {
        if (!profile) {
            console.log(profile)
            errors.noprofile = `There is no profile for the user`
            return res.status(404).json(errors)
        }
        res.json(profile)
    })
    .catch((err) => res.status(404).json(err))
})

// @route   POST api/profile
// @desc    Create or edit user profile
// @access  Private
_route.post('/',
            passport.authenticate("jwt", { session: false }),
            (req,res) => {
                const profileFields = {};
                 profileFields.user = req.user.id;
                 
                 if (req.body.city) profileFields.city = req.body.city;
                 if (req.body.bio) profileFields.bio = req.body.bio;

                 Profile.findOne({user:req.user.id})
                 .then(profile => {

                     if(profile) {
                        Profile.findOneAndUpdate(
                            { user: req.user.id },
                            { $set: profileFields },
                            { new: true },
                            
                          ).populate("user", ["name","lastname", "avatar"])
                          .then (profile => {
                              console.log(profile)
                              res.json(profile)
                          })
                     } else {
                        new Profile(profileFields).save()
                        .then(profile => profile.populate("user","name lastname avatar").execPopulate())
                        .then((profile) => res.json(profile));
                     }
                 })
                .catch((err) => res.status(401).json(err)) 

            }
        )


// @route   POST api/profile/follow/:user_id
// @desc    Follow a user (friends)
// @access  Private
_route.post(
    '/follow/:user_id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        console.log(req.user.id)
        Profile.findOne({user:req.user.id})
        .then(profile => {
           
            if (
                profile.following.filter(following => following.user.toString() === req.params.user_id).length>0
                ) {
                   
                    return res
                    .status(400)
                    .json({ alreadyfollowing: 'User already following the user' });
                }

            profile.following.unshift({user:req.params.user_id})  
            profile.save()    
                .then(profile => profile.populate("following.user","name lastname").execPopulate())       
                .then(profile => res.json(profile))  

            Profile.findOne({user:req.params.user_id})    
            .then(profile => {
                profile.followers.unshift({user:req.user.id})
                profile.save()
                    .then(profile => profile.populate("followers.user","name lastname").execPopulate())
                    .then(profile => console.log(profile))
            })           
            
        })

        .catch(err => res.json(err))
    })
     
// @route   POST api/profile/unfollow/:user_id
// @desc    Follow a user (friends)
// @access  Private
_route.post(
    '/unfollow/:user_id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        console.log(req.user.id)
        Profile.findOne({user:req.user.id})
        .then(profile => {
           
            if (
                profile.following.filter(following => following.user.toString() === req.params.user_id).length===0
                ) {
                   
                    return res
                    .status(400)
                    .json({ alreadyfollowing: 'User are not following the user' });
                }

                const removeIndex = profile.following
                .map(following => following.user.toString())
                .indexOf(req.params.user_id);    

            profile.following.splice(removeIndex,1)  
            profile.save()    
                .then(profile => profile.populate("user","name lastname").execPopulate())       
                .then(profile => res.json(profile))  

            Profile.findOne({user:req.params.user_id})    
            .then(profile => {

                const removeIndex = profile.followers
                .map(followers => followers.user.toString())
                .indexOf(req.user.id);  

                profile.followers.splice(removeIndex,1)
                profile.save()
                    .then(profile => profile.populate("followers.user","name lastname").execPopulate())
                    .then(profile => console.log(profile))
            })           
            
        })

        .catch(err => res.json(err))
    })

// @route   POST api/profile/follow/:post
// @desc    Follow a user (friends)
// @access  Private
_route.post('/following/post',
            passport.authenticate('jwt', { session: false }),
            (req,res) => {
                
                Profile.findOne({user:req.user.id})
                .then(profile => {
                    console.log(profile)

                    if ((profile.following).length === 0) {   

                        return res
                        .status(400)
                        .json({ NoPost: 'No Posts to show.Add more friends to see more posts in your News Feed.' });
                    }

                    const followpost  = profile.following.map(following => following.user)
                    console.log(followpost)    


                    Post.find({postedbyuser:{"$in":followpost}})
                    .populate("postedbyuser","name lastname avatar")
                    .sort({date:-1})
                    .then(posts => {
                        console.log(posts)
                        res.json(posts)
                    })
                    .catch(err =>  res.status(404).json({ nopostsfound: 'No posts found' }))  

                })
                .catch(err => console.log(err))
            }
            )


module.exports = _route
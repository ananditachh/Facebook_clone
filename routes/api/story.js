const express = require('express');
const _route = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const Profile = require("../../models/ProfileModel");
const Story = require("../../models/StoryModel")
const User = require("../../models/UsersModel");


_route.get('/',(req,res) => res.json({
    msg:'Story route works'
}))

// @route   POST api/mystory/user/story/
// @desc    Create a story or update if its there
// @access  Private
_route.post('/create/story',
            passport.authenticate('jwt', { session: false }),
            (req,res) => {
                const storyFields = {}

                storyFields.postedbyuser = req.user.id;
                if (req.body.text) storyFields.text = req.body.text;
                if (req.body.image) storyFields.image = req.body.image;

                Story.findOne({postedbyuser:req.user.id})
                 .then(story => {

                     if(story) {
                        Story.findOneAndUpdate(
                            { postedbyuser: req.user.id },
                            { $set: storyFields },
                            { new: true },
                            
                          ).populate("postedbyuser", ["name","lastname", "avatar"])
                          .then (story => {
                              console.log(story)
                              res.json(story)
                          })
                     } else {
                        new Story(storyFields).save()
                        .then(story => story.populate("postedbyuser","name lastname avatar").execPopulate())
                        .then((story) => res.json(story));
                     }
                 })
                .catch((err) => res.status(401).json(err))             
            }

)

// @route   GET api/mystory/story/
// @desc    show the story for current user and their followers 
// @access  Private
_route.get(
    '/story',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      console.log(req.user)  
      Story.find({ postedbyuser: req.user.id })
        .populate("postedbyuser","name lastname avatar")
        .then(story => {
            if (Object.keys(story).length > 0) {   
            res.json(story)
          } else {
            res.status(404).json({ nopostfound: 'Create a story' })
          }
        }
        )
        .catch((err) =>
          res.status(404).json({ nopostfound: 'No Story found for the user' })
        );
    }
  );

// @route   POST api/mystory/allstory/
// @desc    get the story for current user and their followers 
// @access  Private



module.exports = _route
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

// @route   POST api/mystory/currentuser/story/
// @desc    show the story for current user and their followers 
// @access  Private






module.exports = _route
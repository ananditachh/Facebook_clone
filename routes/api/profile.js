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
    Profile.findById(req.params.id)
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




module.exports = _route
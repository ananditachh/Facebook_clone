const express = require('express')
const _route = express.Router()
const mongoose = require('mongoose');
const passport = require('passport');
const logger = require('../../utils/logger')
const jwt = require('jsonwebtoken')
const Post = require('../../models/PostsModel')
const validatePostInput = require('../../validation/post');

_route.get('/register',(req,res) => res.json({
    msg:'Posts route works'
}))


//@Routes GET  /api/post/allpost
//@desc get all post 
//@access Public
_route.get('/allposts',(req,res) => {
    Post.find({},{_v:0})
    .sort({date:-1})
    .populate("postedbyuser","name lastname avatar")
    .then(posts => res.json(posts))
    .catch(err => console.log(err))
})



//@Routes POST   /api/post/createpost
//@desc Creating a post 
//@access Private
_route.post('/createpost',passport.authenticate('jwt',{session:false}),
            (req,res) => {
        const { errors, isValid } = validatePostInput(req.body);
        if (!isValid) {
            return res.status(400).json(errors);
        }   
        const newPost = new Post({
            text:req.body.text,
            image:req.body.image,
            postedbyuser : req.user.id
        })      

        newPost.save()
        .then(post => res.json(post))
        .catch(err => logger.error(`Error while creating post ${err}`))

})



module.exports = _route
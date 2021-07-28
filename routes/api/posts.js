const express = require('express')
const _route = express.Router()
const mongoose = require('mongoose');
const passport = require('passport');
const logger = require('../../utils/logger')
const jwt = require('jsonwebtoken')
const Post = require('../../models/PostsModel')
const validatePostInput = require('../../validation/post');


//@Routes GET  /api/post/allpost
//@desc get all post 
//@access Public
_route.get('/allposts',(req,res) => {
    Post.find({})
    .sort({date:-1})
    .populate("postedbyuser", 
              "name lastname avatar")
    .then(posts => 
        res.json(posts)
                   )
    .catch(err =>  res.status(404).json({ nopostsfound: 'No posts found' }))
})


//@Routes POST   /api/post/createpost
//@desc Creating a post 
//@access Private
_route.post('/createpost',
            passport.authenticate('jwt',{session:false}),
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
        .then(post => 
                post.populate("postedbyuser","name lastname avatar").execPopulate())
        .then(post => 
                res.json(post))
        .catch(err => 
                logger.error(`Error while creating post ${err}`))

})


//@Routes GET  /api/post/postid
//@desc get current user post 
//@access Private
_route.get(
    '/user/posts',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      console.log(req.user)  
      Post.find({ postedbyuser: req.user.id })
        .populate("postedbyuser","name lastname avatar")
        .then(post =>          
          res.json(post)
        )
        .catch((err) =>
          res.status(404).json({ nopostfound: 'No post found for the user' })
        );
    }
  );


 //@Routes GET  /api/post/postid
//@desc get individual post 
//@access Private
_route.get(
    '/:postid',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      console.log(req.user)  
      Post.findById(req.params.postid)
        .populate("postedbyuser","name lastname avatar")
        .then(post =>          
          res.json(post)
        )
        .catch((err) =>
          res.status(404).json({ nopostfound: 'No post found with the id' })
        );
    }
  ); 

 


module.exports = _route
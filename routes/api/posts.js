const express = require('express')
const _route = express.Router()
const mongoose = require('mongoose');
const passport = require('passport');
const logger = require('../../utils/logger')
const jwt = require('jsonwebtoken')
const Post = require('../../models/PostsModel')
const Profile = require('../../models/ProfileModel')
const validatePostInput = require('../../validation/post');


//@Routes GET  /api/posts/allposts
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


//@Routes POST   /api/posts/createpost
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


//@Routes GET  /api/posts/user/posts
//@desc get current user post 
//@access Private
_route.get(
    '/user/posts',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      console.log(req.user)  
      Post.find({ postedbyuser: req.user.id })
        .populate("postedbyuser","name lastname avatar")
        .then(post => {
            if (Object.keys(post).length > 0) {   
            res.json(post)
          } else {
            res.status(404).json({ nopostfound: 'No post found for the user' })
          }
        }
        )
        .catch((err) =>
          res.status(404).json({ nopostfound: 'No post found for the user' })
        );
    }
  );


 //@Routes GET  /api/posts/postid
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


 //@Routes POST  /api/posts/user/:editpost
//@desc update user post 
//@access Private
_route.post('/user/:editpost',
            passport.authenticate('jwt', { session: false }),
            (req,res) => {
              Post.findById(req.params.editpost)
              .then(post => {
                if (!post) {
                  res.status(404).json({ nopostfound: 'No post found with the id' })
                }  else {
                      console.log('in post')
                      console.log(post)

                      if (post.postedbyuser.toString() === req.user.id) {
                        const fields = {}
                        fields.postedbyuser = req.user.id
                        fields.text = req.body.text
                        fields.image = req.body.image
                       
                        Post.findOneAndUpdate(
                          {_id:req.params.editpost},
                          {$set:fields},
                          { new: true }
                        )
                        .populate("postedbyuser","name lastname avatar")
                        .then(posts => {
                          //console.log(req.user)
                          res.json(posts)
                        })
                        .catch(err => {
                          logger.error(err)
                          res.status(404).json({ updateposterror: 'Error in updating the post' })
                        })                        
                  } else {
                    res.status(401).json({ notauthorized: 'You can edit only your post' })
                  }               
                }
              })
              .catch(err => res.status(404).json({ nopostfound: 'No post found ' }))
            } 
        )            

        
//@Routes DELETE  /api/posts/deletepost
//@desc delete user post 
//@access Private            
_route.delete('/deletepost/:id',
            passport.authenticate('jwt', { session: false }),
            (req,res) => {
              //console.log(req.params.id)
              Post.findById(req.params.id)
              .then(post => {
                if (post.postedbyuser.toString() !== req.user.id.toString()) {
                    return res
                    .status(401)
                    .json({ notauthorized: 'User not authorized' })
                }
                post.remove()
                .then(() => res.json({ success: true }))
                .catch(err=>logger.error(err));
              })
              .catch(err => {
                logger.error(err)
                res.status(404).json({ postnotfound: 'No post found' })}
              )
            })


//@Routes POST  /api/posts/like/:id
//@desc Likes user post 
//@access Private 
_route.post(
  '/like/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyliked: 'User already liked this post' });
          }

          // Add user id to likes array
          post.likes.unshift({ user: req.user.id });

          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
    });
  }
);

// @route   POST api/posts/unlike/:id
// @desc    Unlike post
// @access  Private
_route.post(
  '/unlike/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ notliked: 'You have not yet liked this post' });
          }

          // Get remove index
          const removeIndex = post.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);

          // Splice out of array
          post.likes.splice(removeIndex, 1);

          // Save
          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
    });
  }
);

// @route   POST api/posts/comment/:id
// @desc    Add comment to post
// @access  Private
_route.post(
  '/comment/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    Post.findById(req.params.id)
      .then(post => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id
        };

        // Add to comments array
        post.comments.unshift(newComment);

        // Save
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
  }
);

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Remove comment from post
// @access  Private
_route.delete(
  '/comment/:id/:comment_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        // Check to see if comment exists
        if (
          post.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexists: 'Comment does not exist' });
        }
        
        // Get remove index
        const removeIndex = post.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);

        // Splice comment out of array
        post.comments.splice(removeIndex, 1);

        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
  }
);

// @route   POST api/posts/save/:post_id
// @desc    save followers post and own post
// @access  Private

_route.post('/save/:post_id',
            passport.authenticate('jwt', { session: false }),
            (req,res) => {
              Profile.findOne({user:req.user.id})
              .then(profile => {
                if (
                  profile.saved.filter(saved => saved.savedpost.toString() === req.params.post_id).length > 0
                  ) {
                    return res
                    .status(400)
                    .json({ alreadypostsaved: 'You already saved the post' });
                  }

                profile.saved.unshift({savedpost:req.params.post_id,})
                //.populate("saved.savedpost", "postedbyuser")
                //.populate("postedbyuser","name lastname avatar")
                profile.save()                             
                .then(profile => res.json(profile))
                .catch(err => console.log(error))
              })
              .catch(err => res.json(err))
            }

            )


// @route   POST api/posts/unsave/:post_id
// @desc    unsave followers post and own post
// @access  Private
_route.post('/unsave/:post_id',
            passport.authenticate('jwt', { session: false }),
            (req,res) => {
              Profile.findOne({user:req.user.id})
              .then(profile => {
                if (
                  profile.saved.filter(saved => saved.savedpost.toString() === req.params.post_id).length === 0
                ) {
                  return res
                  .status(400)
                  .json({Nopost: 'There is no saved items' });
                }

                const removeIndex = profile.saved
                .map(saveditem => saveditem._id.toString())
                .indexOf(req.params.post_id);
      
                profile.saved.splice(removeIndex, 1);

                profile.save().then(post => res.json(post));

              })
              .catch(err => res.json(err))
            }  
            )

// @route   POST api/posts/allsavedpost/
// @desc    Saved post for the current user
// @access  Private
_route.post('/allsavedpost',
            passport.authenticate('jwt', { session: false }),
            (req,res) => {

              Profile.findOne({user:req.user.id})
              .then(profile => {
                if ((profile.saved).length === 0) {
                  return res
                  .status(400)
                  .json({ NosavedPost: 'No Posts to show.'})
                }

                const savedPost  = profile.saved.map(saved => saved.savedpost)
                console.log(savedPost)
                
                Post.find({_id:{"$in":savedPost}})
                    .populate("saved.savedpost","text image like comments postedbyuser")
                    .populate("postedbyuser","name lastname avatar")
                    .sort({date:-1})
                    .then(posts => {
                        console.log(posts)
                        res.json(posts)
                    })
                    .catch(err => logger.error(err))
                
              })
              .catch(err => res.json(err))
            }
            )










module.exports = _route
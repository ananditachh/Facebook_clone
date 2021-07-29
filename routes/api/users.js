const express = require('express')
const _route = express.Router()
const bcrypt  = require ('bcryptjs')
const User = require('../../models/UsersModel')
const Profile = require('../../models/ProfileModel')
const gravatar = require('gravatar')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys');
const logger = require('../../utils/logger')
const passport = require('passport')
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');



//@Routes POST   /api/user/register
//@desc Registering a user
//@access Public

_route.post('/register',(req,res) => {

    const {errors, isValid} = validateRegisterInput(req.body);
  
  if(!isValid){
    return res.status(400).json(errors);
  }
    User.findOne({email:req.body.email})
    .then(user => {
        if(user) {
            return res.status(400).json({email:"Email alreay exist"})
        } else { 

            const avatar = gravatar.url('req.body.email', {
                            s: '200',
                             r: 'pg', 
                             d: 'mm'
                    });


            const newUser = new User ({
                name:req.body.name,
                lastname:req.body.lastname,
                email:req.body.email,
                password:req.body.password,
                avatar
            })
           
            bcrypt.genSalt(10)
            .then((salt) => {
                console.log(salt)
                return bcrypt.hash(req.body.password,salt)
            })
            .then ((hash) => {
                if (hash) {
                    newUser.password = hash
                }
                console.log(newUser)
                return newUser.save()
            }) 

            .then(user => {
                res.json(user)
                logger.info(`User successfully created id:${user._id} email:${user.email}`)            
            })

            .catch(err => {
                console.log(err)
                logger.error(`Error while registering new user ${err}`)
                return {
                    status: 400,
                    message: err
                }
            })

        }
    })

    .catch(err => logger.error(`Error while checking user in the register route ${err}`))
})

//@Routes POST  /api/user/login
//@desc Login a user
//@access Public

_route.post('/login',(req,res) => {

    const {errors, isValid} = validateLoginInput(req.body);
  
    if(!isValid){
      return res.status(400).json(errors);
    }
    User.findOne({email:req.body.email})
    .then(user => {
        if(!user) {
            return res.status(404).json({email:"User is not registered"})
        }

        bcrypt.compare(req.body.password,user.password)
        .then(isMatch => {
            if (isMatch) {
                //return res.json({msg:'User Logged in'})
                const payload = {
                    id: user.id,
                    name: user.name,
                    avatar: user.avatar
                  };

                  jwt.sign(
                      payload,
                      keys.secretOrKey,
                      {expiresIn:3600},
                      (err, token) => {
                          if (token) {
                            return res.json({token: 'Bearer ' + token});
                          } else {
                              logger.error(`Error in jwt token genration: ${err} `)
                          }                   
                      })                   
                      
            } else {
            return res.status(400).json({password:"Password didnt match."})
            }
        })
        .catch(err => logger.error(` ${err}`))

    })
    .catch(err => logger.error(`Error while user tries to login ${err}`))
})


//@Routes GET    Route
//@desc Registering a user
//@access Private
_route.get('/current',
    passport.authenticate ('jwt',{session:false}),
    (req,res) => {
        
        res.json(req.user)

})

module.exports = _route

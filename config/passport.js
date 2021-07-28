const jwtStrategy = require('passport-jwt').Strategy
const extractJwt = require('passport-jwt').ExtractJwt
const keys = require('../config/keys')
const User = require('../models/UsersModel');

const opts = {}
opts.jwtFromRequest = extractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey

module.exports = passport => {
    passport.use (
        new jwtStrategy(opts,(payload,done) => {
            User.findById(payload.id)
            .then(user => {
                if (user) {
                    return done(null,user)
                }
                return done(null,false)
            })
                
            .catch(err => console.log(err))
            

        })
    )
} 

const express = require('express')
const mongoose = require('mongoose')
const users = require('./routes/api/users')
const posts = require('./routes/api/posts')
const profile = require('./routes/api/profile') 
const logger = require('./utils/logger')
const passport = require('passport')
//const compression = require('compression')
const app = express()
const fs = require('fs')
const morgan = require('morgan')
const keys = require('./config/keys')

// setup the Http request and response logger
const accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'})
app.use(morgan('combined', {stream: accessLogStream}))

//Db Config
const db = keys.mongoUrl
mongoose
    .connect(db,{useNewUrlParser:true},
                {useUnifiedTopology:true})
    .then(() => {
        console.log("Connected to db")
        logger.info("Connected to Mongodb")})
    .catch(err => {
        console.log(err)
        logger.error({message:err})
    })

//Middleware
app.use(express.urlencoded())
app.use(express.json())    

//passport config
app.use(passport.initialize())
require('./config/passport')(passport)



//Routes
app.get('/', (req,res) => res.send('Hello World Mohita Hello!'))


//Middleware functions
app.use('/api/users',users)
app.use('/api/posts',posts)
app.use('/api/profile',profile)

//app.use((req, res, next) => {
    //res.status(404).send({
    //status: 404,
    //error: 'Not found',
    
    //})
   //})

//Initializing Server
const PORT = 7000
app.listen(PORT, () => {
    console.log('Server started....')
    logger.info(`Server started and running on ${PORT}`)
})


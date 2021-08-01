const express = require('express')
const mongoose = require('mongoose')
const users = require('./routes/api/users')
const posts = require('./routes/api/posts')
const profile = require('./routes/api/profile')
const story = require('./routes/api/story')  
const logger = require('./utils/logger')
const passport = require('passport')
//const compression = require('compression')
const app = express()
const fs = require('fs')
const morgan = require('morgan')
const keys = require('./config/keys')
const multer = require('multer')
const path = require("path");

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


//Multer middleware to save file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "/SOCIALMEDIAAPP/uploads");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });

  const upload = multer({ storage: storage });
  app.post("/fileupload", upload.single("file"), (req, res) => {
    try {
      return res.status(200).json("File uploded successfully");
    } catch (error) {
      console.error(error);
    }
  });  


//Routes
app.get('/', (req,res) => res.send('Hello World Mohita Hello!'))


//Middleware functions
app.use('/api/users',users)
app.use('/api/posts',posts)
app.use('/api/profile',profile)
app.use('/api/mystory',story)


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

module.exports = {upload}
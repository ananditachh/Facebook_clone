const express = require('express')
const _route = express.Router()

_route.get('/register',(req,res) => res.json({
    msg:'Posts route works'
}))

module.exports = _route
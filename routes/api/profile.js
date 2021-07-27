const express = require('express')
const _route = express.Router()

_route.get('/',(req,res) => res.json({
    msg:'Profile route works'
}))

module.exports = _route
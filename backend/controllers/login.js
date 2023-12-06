
const { login } = require('../functions/loginFunction')
const loginRouter=require('express').Router()

loginRouter.post("/",login);
module.exports=loginRouter
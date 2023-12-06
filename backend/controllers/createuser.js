const { createuser } = require('../functions/createuserFunction');
const createuserRouter=require('express').Router()





createuserRouter.post("/",createuser)

module.exports=createuserRouter

const addfileRouter=require('express').Router()
const { addfile } = require('../functions/addfileFunction')


addfileRouter.post("/",addfile)
module.exports=addfileRouter
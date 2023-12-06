const User = require('../models/User')
const jwt=require('jsonwebtoken')
const savefileRouter=require('express').Router()
const File= require('../models/File')





savefileRouter.post("/",async (req,res)=>{
    const token=req.headers['x-access-token'];
    const file_id=req.body.fileId;
    const code=req.body.code;
    console.log(token);
    try{
        const decoded=jwt.verify(token,"secrettext");
        const email=decoded.email;
        const u=await User.findOne({email});
        if(!u){
            res.json({status:'error'});
        }
        const f1=await File.findOne({url:file_id});
        await f1.updateContent(code);
        res.json({status:'ok'});
    }
    catch(err){
        res.json({status:'error',error:err});
        return ;
    }
})

module.exports=savefileRouter
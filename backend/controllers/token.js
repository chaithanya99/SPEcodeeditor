
const User = require('../models/User')
const jwt=require('jsonwebtoken')
const tokenRouter=require('express').Router()

tokenRouter.get("/",async (req,res)=>{
    const token = req.headers['x-access-token'];
    try{
        const decoded=jwt.verify(token,"secrettext");
        const email=decoded.email;
        const u=await User.findOne({email});
        const allFiles=[]
        for(let i=0;i<u.files.length;i+=1){
            allFiles.push(u.files[i].name)
        }
        return res.json({status:"ok",files: allFiles,username:u.name});
    }catch(err){
        res.json({status:"error"})
    }
})

module.exports=tokenRouter
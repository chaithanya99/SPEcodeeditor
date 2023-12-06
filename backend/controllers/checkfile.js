

const User = require('../models/User')
const jwt=require('jsonwebtoken')
const checkfileRouter=require('express').Router()
const File= require('../models/File')




checkfileRouter.get("/",async (req,res)=>{
    const token=req.headers['x-access-token'];
    const file_id=req.query.fileId;
    try{
        const decoded=jwt.verify(token,"secrettext");
        const email=decoded.email;
        const u=await User.findOne({email});
        let f1;
        for(let i=0;i<u.files.length;i+=1){
            if(u.files[i].url===file_id){
                f1=u.files[i];
                break;
            }
        }
        if(f1){
            const f11=await File.findOne({url:file_id});
            res.json({status:'ok', code_content:f11.content ,username:u.name});
            return ;
        }
        else{
            res.json({status:'error',error:"file not found"});
            return ;
        }
    }
    catch(err){
        res.json({status:'error'});
    }
})

module.exports=checkfileRouter
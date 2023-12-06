
const User = require('../models/User')
const jwt=require('jsonwebtoken')
const getcodeRouter=require('express').Router()
const File= require('../models/File')


getcodeRouter.get("/",async (req,res)=>{
    const token=req.headers['x-access-token'];
    const fileName=req.query.filename;
    try{
        const decoded=jwt.verify(token,"secrettext");
        const email=decoded.email;
        const u=await User.findOne({email});
        let f1;
        for(let i=0;i<u.files.length;i+=1){
            if(u.files[i].name===fileName){{
                console.log(u.files[i].name);
                f1=u.files[i];
                break;
            }}
        }
        const file1=await File.findOne({_id:f1._id});
        console.log(f1);
        const id=f1.url;
        return res.json({status:'ok',id});
    }
    catch(err){{
        console.log(err);
        res.json({status:"error"});
    }}
})

module.exports=getcodeRouter
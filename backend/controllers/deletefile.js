const User = require('../models/User')
const jwt=require('jsonwebtoken')
const deletefileRouter=require('express').Router()
const File= require('../models/File')




deletefileRouter.delete("/",async (req,res)=>{
    const token=req.headers['x-access-token'];
    const fileName=req.body.filename;
    try{
        const decoded=jwt.verify(token,"secrettext");
        const email=decoded.email;
        const u=await User.findOne({email});
        let id;
        for(let i=0;i<u.files.length;i+=1){
            if(u.files[i].name===fileName){{
                id=u.files[i]._id;
            }}
        }
        const updatedUser=await u.deleteFile(id);

        await File.deleteOne({_id:id});
        const allFiles=[]
        for(let i=0;i<u.files.length;i+=1){
            allFiles.push(u.files[i].name)
        }
        return res.json({status:"ok",files: allFiles})
    }
    catch(err){
        console.log(err);
    }
})

module.exports=deletefileRouter
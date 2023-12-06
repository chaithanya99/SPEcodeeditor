const User = require('../models/User')
const jwt=require('jsonwebtoken')
const File=require('../models/File')
const {v4: uuid}= require('uuid')

async function addfile (req,res){
    const token=req.headers['x-access-token'];
    const fileName=req.body.filename;
    try{
        const decoded=jwt.verify(token,"secrettext");
        const email=decoded.email;
        const u=await User.findOne({email});
        for(let i=0;i<u.files.length;i+=1){
            if(u.files[i].name===fileName){
                res.json({status:"error",error:"File already exists"});
                return;
            }
        }
        const f1=new File({
            name:fileName,
            url: uuid()
        })
        const output=await f1.save();
        const updateFiles=await u.addFile(f1);
        const allFiles=[]
        for(let i=0;i<u.files.length;i+=1){
            allFiles.push(u.files[i].name)
        }
        return res.json({status:"ok",files: allFiles})
    }
    catch(err){
        console.log(err);
    }
}

module.exports={addfile}
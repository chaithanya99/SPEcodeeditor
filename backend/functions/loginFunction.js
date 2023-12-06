const User = require('../models/User')
const jwt=require('jsonwebtoken')

async function login(req,res){
    const u=await User.findOne({email:req.body.email});
    if(!u){
        res.json({status: 'error',error:"wrong username or password"});
        return;
    }
    if(u.password !==req.body.password){
        res.json({status: 'error',error:"wrong username or password"});
        return;
    }
    const token=jwt.sign(
        {
            name: u.name,
            email: u.email

        },
        "secrettext"
    )
    res.json({status:"ok", user:token})
}
module.exports={login}
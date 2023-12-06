const User = require('../models/User');


async function createuser(req,res){

    const u=await User.findOne({email:req.body.email});
    if(u){
        res.json({status: 'error',error:'user already exists'});
        return ;
    }
    const u1=new User({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name
    })
    const output=await u1.save()
    // console.log(output)
    res.json({status: 'ok'})
}

module.exports={createuser}
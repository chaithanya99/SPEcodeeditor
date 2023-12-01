const express=require('express')
const app=express()
const sockerIO=require('socket.io')
const mongoose=require('mongoose')
const cors=require('cors')
const User = require('./models/User')
const File= require('./models/File')
const jwt=require('jsonwebtoken')
const {v4: uuid}= require('uuid')
// const MONGODBURL=require('./utils/constants')
require('dotenv').config()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : false}))
const MONGODBURL=process.env.MONGODB
console.log(MONGODBURL)
mongoose.connect(MONGODBURL+'/code',{useNewUrlParser:true,useUnifiedTopology: true})
.then(()=>{console.log( "connecting to the database")})
.catch(()=>{console.log( "not able to connect to the database")})


const PORT= process.env.PORT
// const usermap={};
console.log(PORT)
const server=app.listen(PORT,(err)=>{
    if(!err)
        console.log(`listening on port `)
    else{
        console.log(err)
    }
})
// const io=sockerIO(server);
// const getuser=(roomId)=>{
//     return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
//         (socketId) => {
//             return {
//                 socketId,
//                 username: usermap[socketId],
//             };
//         }
//     );
// }
// io.on('connection',(socket)=>{
    
//     console.log('socket connected',socket.id)
//     // console.log(usermap)
//     socket.on('join',({roomId,username})=>{
//         console.log(roomId);
//         usermap[socket.id]=username;
//         socket.join(roomId);
//         const users=getuser(roomId);
//         users.forEach(({ socketId }) => {
//             io.to(socketId).emit('joined', {
//                 users,
//                 username,
//                 socketId: socket.id,
//             });
//         });
//         console.log(users);
//     })
// });


app.get("/",(req,res)=>{
    res.send("hil")
})
app.post("/createuser",async (req,res)=>{

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
    console.log(output)
    res.json({status: 'ok'})
})

app.post("/login",async (req,res)=>{
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
})

app.get("/token",async (req,res)=>{
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
        // console.log(err);
        res.json({status:"error"})
    }

    // res.json({status:"checking"})
})

app.post("/addfile",async (req,res)=>{
    const token=req.headers['x-access-token'];
    const fileName=req.body.filename;
    // console.log(fileName)
    // console.log(token)
    // console.log(req.headers)
    try{
        const decoded=jwt.verify(token,"secrettext");
        const email=decoded.email;
        // console.log(email)
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
})

app.delete("/deletefile",async (req,res)=>{
    const token=req.headers['x-access-token'];
    const fileName=req.body.filename;
    // console.log(token)
    // console.log(req.body)
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

app.get("/getcode",async (req,res)=>{
    const token=req.headers['x-access-token'];
    const fileName=req.query.filename;
    // console.log(req.query);
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
        // const code=file1.content;
        // const username=u.name;
        // return res.json({status:'ok'});
        return res.json({status:'ok',id});
    }
    catch(err){{
        console.log(err);
        res.json({status:"error"});
    }}
})


app.get("/checkfile",async (req,res)=>{
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

app.post("/savefile",async (req,res)=>{
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
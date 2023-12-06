const express=require('express')
const app=express()
const mongoose=require('mongoose')
const cors=require('cors')
const createuserRouter=require('./controllers/createuser')
const loginRouter=require('./controllers/login')
const tokenRouter = require('./controllers/token')
const addfileRouter = require('./controllers/addfile')
const deletefileRouter = require('./controllers/deletefile')
const getcodeRouter = require('./controllers/getcode')
const checkfileRouter = require('./controllers/checkfile')
const savefileRouter = require('./controllers/savefile')
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
console.log(PORT)
const server=app.listen(PORT,(err)=>{
    if(!err)
        console.log(`listening on port `)
    else{
        console.log(err)
    }
})



app.get("/",(req,res)=>{
    res.send("hil")
})

app.use('/createuser',createuserRouter)
app.use('/login',loginRouter)
app.use('/token',tokenRouter)
app.use('/addfile',addfileRouter)
app.use('/deletefile',deletefileRouter)
app.use('/getcode',getcodeRouter)
app.use('/checkfile',checkfileRouter)
app.use('/savefile',savefileRouter)

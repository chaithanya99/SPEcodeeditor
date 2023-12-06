const express=require('express')
const app=express()
const mongoose=require('mongoose')
const cors=require('cors')
const morgan=require('morgan')
const path = require('path')
const fs=require('fs')
const logFile=fs.createWriteStream(path.join(__dirname,'access.log'),{flags:'a'})
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


morgan.token('data', request => {
	if (request.body.password)
		request.body.password = ''
	return JSON.stringify(request.body)
})

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
app.use(morgan(':date[web] :method :url :status :res[content-length] - :response-time ms :data',{stream: logFile}))

app.use('/createuser',createuserRouter)
app.use('/login',loginRouter)
app.use('/token',tokenRouter)
app.use('/addfile',addfileRouter)
app.use('/deletefile',deletefileRouter)
app.use('/getcode',getcodeRouter)
app.use('/checkfile',checkfileRouter)
app.use('/savefile',savefileRouter)

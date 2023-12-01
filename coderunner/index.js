const express=require("express")
const cors= require("cors")
const { generateFile }=require("./generateFile")
const {runFile}= require("./runFile")

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors())
app.listen(5005,()=>{
    console.log("connected on port 6000");
});

app.get("/",(req,res)=>{
    res.send("hello");
})

app.post("/",async (req,res)=>{
    console.log(req.body);
    const {type="cpp",code="",inputParams=""}=req.body;
    // console.log(input);
    if(code === ""){
        res.status(400).send("write code");
    }
    try{
        const {filePath,inputFilePath}=await generateFile(type,code,inputParams);
        console.log(inputFilePath)
        const output=await runFile(filePath,inputFilePath)
        res.json({status:'ok',output});
        // res.send({output});
    }catch(err){
        res.json({status:'error',output:err["stderr"]});
        // res.status(500).send(err["stderr"])
    }
})
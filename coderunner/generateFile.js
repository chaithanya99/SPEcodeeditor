const fs=require("fs")
const path = require("path")
const {v4:uuid}= require("uuid")
const codesDirectory=path.join(__dirname,"codes")
const inputDirectory= path.join(__dirname,"inputs")
try{
    if(!fs.existsSync(codesDirectory)){
        fs.mkdirSync(codesDirectory)
    }
    if(!fs.existsSync(inputDirectory)){
        fs.mkdirSync(inputDirectory)
    }
}catch(err){
    console.log(err)
}


const generateFile=async (type,code,input)=>{
    const id=uuid();
    const filePath=path.join(codesDirectory,`${id}.${type}`);
    const inputFilePath=path.join(inputDirectory,`${id}.txt`);
    await fs.writeFileSync(filePath,code);
    await fs.writeFileSync(inputFilePath,input)
    return {filePath,inputFilePath};
}   

module.exports={generateFile}
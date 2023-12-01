const path = require("path")
const {exec} = require("child_process")
const outputPath= path.join(__dirname,"outputs")
const fs=require("fs")
try{
    if(!fs.existsSync(outputPath)){
        fs.mkdirSync(outputPath)
    }
}catch(err){
    console.log(err)
}

const runFile=async (filePath,inputFilePath)=>{
    const id=path.basename(filePath).split(".")[0];
    const outputFile=path.join(outputPath,id);
    // const inputData=await fs.readFileSync(inputFilePath,'utf8');
    return new Promise((resolve,reject)=>{
        exec(`timeout 30s g++ ${filePath} -o ${outputFile} && ${outputFile} < ${inputFilePath}`,
        (error,stdout,stderr)=>{
            if(error){
                reject({error,stderr})
            }
            if(stderr){
                reject(stderr)
            }
            resolve(stdout)
        })

    });
}

module.exports={
    runFile
}
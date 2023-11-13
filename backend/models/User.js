const mongoose=require('mongoose')
const file = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    content:{
        type: String,
        default: ""
    },
    url:{
        type:String,
        required: true
    }
})


const user = new mongoose.Schema({
    email:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    name:{
        type: String,
        required: true,
    },
    files:{
        type: [file],
        default: []
    }
})
user.methods.addFile=function(fileObj){
    this.files.push(fileObj);
    return this.save();
}
user.methods.deleteFile=function(fileId){
    this.files.pull({_id:fileId});
    return this.save();
}
module.exports=new mongoose.model('user',user);
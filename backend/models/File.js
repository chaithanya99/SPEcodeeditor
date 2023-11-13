const mongoose=require("mongoose")

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

module.exports= new mongoose.model('file',file);
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

file.methods.updateContent = async function(newContent) {
    try {
      // Update the content field
      this.content = newContent;
  
      // Save the updated document
      await this.save();
  
      return { success: true, message: 'Content updated successfully' };
    } catch (error) {
      console.error('Error updating content:', error.message);
      return { success: false, message: 'Error updating content' };
    }
  };



module.exports= new mongoose.model('file',file);
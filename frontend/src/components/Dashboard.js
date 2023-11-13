
import React, { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FileRow from './Filerow';
import toast from 'react-hot-toast';
const Dashboard = () => {
    const navigate=useNavigate()
    const [files,setFiles]=useState([]);
    const [newFileName, setNewFileName] = useState('');
    const handleAddFile=(e)=>{
      async function addFile(){
        // console.log(localStorage.getItem('token'))
        const addFile=await axios.post("http://localhost:5001/addfile",{

          filename: newFileName
        },
        {
          headers: {
            'x-access-token': localStorage.getItem('token'),
          },
        })
        if(addFile.data['status']==="ok"){
          setFiles(addFile.data['files']);
          toast.success("File added successfully");
        }
        else{
          toast.error(addFile.data['error']);
        }
        setNewFileName("");
      }
      addFile()
    }
    const handleLogout=(e)=>{
      localStorage.removeItem('token');
      navigate("/");

    }
    const handleDeleteFile=(file)=>{
      // console.log("deleting");
      // console.log(file)
      async function deleteFile(){
        const deleteFile=await axios.delete("http://localhost:5001/deletefile",
        {
          data: {
  
          filename: file
        },
        headers: {
          'x-access-token': localStorage.getItem('token'),
        },
      })
        if(deleteFile.data['status']==="ok"){
          setFiles(deleteFile.data['files']);
          toast.success("File deleted");
        }
      }
      deleteFile();
    }
    const handleEnter=(e)=>{
      if(e.code==='Enter'){
        handleAddFile(e);
      }
    }
  useEffect( ()=>{
    const token = localStorage.getItem('token');
    async function checking(){
      if(token){
         
         const check=await axios.get("http://localhost:5001/token",{
          headers: {
            'x-access-token': localStorage.getItem('token'),
          },
         })
        //  console.log(check)
         if(check.data['status']==="error"){
          localStorage.removeItem('token');
          navigate("/login");
         }
         else{
          setFiles(check.data['files']);
         }
      }
      else{
          navigate("/login");
      }
    }
    checking();

  },[])
  return (
    <div className="file-dashboard">
      <div className="file-input">
        <input
          type="text"
          placeholder="Enter file name"
          value={newFileName}
          onChange={(e) => setNewFileName(e.target.value)}
          onKeyUp={handleEnter}
        />
        <button onClick={handleAddFile}>Add File</button>
      </div>
      <div className="logout-container">
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
      <div className="file-list">
        {files.map((file, index) => (
          <FileRow key={index} fileName={file} onDelete={() => handleDeleteFile(file)} />
        ))}
      </div>


    </div>
  );
}

export default Dashboard
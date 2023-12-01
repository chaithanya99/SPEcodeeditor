import axios from 'axios';
import React from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../utils/constants';
const FileRow = ({ fileName, onDelete }) => {
    const navigate = useNavigate();
    const clickFile=()=>{
        async function goToeditor(){
            const output=await axios.get(BACKEND_URL+"/getcode",
            {
                params:{
                    filename: fileName
                },
                headers:{
                    'x-access-token': localStorage.getItem('token'),
                }
            }
            )
            if(output.data['status']==='ok'){
                console.log(output.data);
                navigate(`/file/${output.data['id']}`)
            }
            else{
                toast.error("something went wrong");
            }
        }
        goToeditor();
    }
  return (
    <div className="file-row">
      <button className='file-name-btn' onClick={clickFile}>{fileName}</button>
      <button className='delete-btn' onClick={onDelete}>Delete</button>
    </div>
  );
};

export default FileRow;

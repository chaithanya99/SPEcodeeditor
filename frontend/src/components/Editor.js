import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Client from './Client';
import CodeEditor from './CodeEditor';
import toast from 'react-hot-toast';
import {BACKEND_URL,CODERUNNER_URL} from '../utils/constants'
const Editor = () => {
    const usernameref=useRef('');
    const [code,setCode]=useState('');
    const [updatedCode,setUpdatedCode]=useState('');
    const [inputData,setInputdata]=useState('');
    const [outputdata,setOutputdata]=useState('');
    const id=useRef(null);
    const navigate=useNavigate();
    const [clients,setClients]=useState([{username: "hello",socketId:1},{username: "chaithanya reddy",socketId:2},{username:"krushikar",socketId:3}]);
    useEffect(()=>{
        const currLocation=window.location.pathname;
    
        const segments=currLocation.split("/");
        id.current=segments.pop();
        const token = localStorage.getItem('token');
        async function checking(){
          if(token){
             
             const check=await axios.get(BACKEND_URL+"/checkfile",{
              params:{
                fileId: id.current,
              },
              headers: {
                'x-access-token': localStorage.getItem('token'),
              },
             })
             if(check.data['status']==="error"){
              localStorage.removeItem('token');
              navigate("/login");
             }
             console.log(check.data);
             usernameref.current=check.data['username'];
             setCode(check.data['code_content']);
             setUpdatedCode(check.data['code_content']);
            }
            else{
                navigate("/login");
            }
        }
        checking();
    },[])

    const handleCodeChange=(e)=>{
        setUpdatedCode(e);
    }

    const handleSaveCode=(e)=>{
        async function saveCode(){
            const output=await axios.post(BACKEND_URL+"/savefile",{
                fileId:id.current,
                code: updatedCode
            },
            {
                headers: {
                    'x-access-token': localStorage.getItem('token'),
                },
            })
            if(output.data['status']==='ok'){
                toast.success("File Saved");
            }
        }
        saveCode();
    }
    const handleLeave=()=>{
        navigate("/dashboard");
    }
    const handleInput=(e)=>{
        setInputdata(e.target.value);
        console.log(inputData);
    }
    const handleRun=()=>{
        async function run(){
            const output = await axios.post(CODERUNNER_URL, {
                code: updatedCode,
                inputParams: inputData
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            if(output.data['status']==='error'){
                toast.error("Error in code");
            }
            setOutputdata(output.data['output']);
            console.log(output);
        }
        run();
    }
      return (
        <div className='mainWrap'>
            <div className='aside'>
                <div className='asideInner'>
                    <h3>Connected Users</h3>
                    <div className="clientsList">
                        {clients.map((client) => (
                            <Client
                                key={client.socketId}
                                username={client.username}
                            />
                        ))}
                    </div>
                </div>
                <button className='btn leaveBtn' onClick={handleLeave}>
                    leave
                </button>
            </div>
            <div>
                <CodeEditor startcode={code} updatecode={handleCodeChange}/>
            </div>
            <div>
                <div>
                    <textarea className="dracula-textarea" placeholder="Input" onChange={handleInput} value={inputData}></textarea>
                </div>
                <div>
                  <textarea className="dracula-textarea" placeholder="Output" readOnly value={outputdata}></textarea>
                </div>
                <div>
                  <button className="dracula-btn" onClick={handleSaveCode}>Save</button>
                  <button className="dracula-btn" onClick={handleRun}>Run</button>
                </div>
            </div>
            
        </div>
        
        
      )
}

export default Editor
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Client from './Client';
import CodeEditor from './CodeEditor';
import { initSocket } from '../socket';
import toast from 'react-hot-toast';
import userEvent from '@testing-library/user-event';
const Editor = () => {
    // const [username,setUsername] = useState('');
    const usernameref=useRef('');
    // const coderef=useRef(null);
    const [code,setCode]=useState('');
    const socketref=useRef(null);
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
             
             const check=await axios.get("http://localhost:5001/checkfile",{
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
            }
            else{
                navigate("/login");
            }
        }
        checking();
    },[])

    const handleCodeChange=(e)=>{
        console.log(e);
        setCode(e);
    }
    // function checkUser(){
    //     const token = localStorage.getItem('token');

    // }
    // useEffect(()=>{
    //     const handleErrors=(err)=>{
    //         console.log(err);
    //     }
    //     const currLocation=window.location.pathname;
    
    //     const segments=currLocation.split("/");
    //     id.current=segments.pop();
    //     const token = localStorage.getItem('token');
    //     async function checking(){
    //       if(token){
             
    //          const check=await axios.get("http://localhost:5001/token",{
    //           headers: {
    //             'x-access-token': localStorage.getItem('token'),
    //           },
    //          })
    //          if(check.data['status']==="error"){
    //           localStorage.removeItem('token');
    //           navigate("/login");
    //          }
    //          usernameref.current=check.data['username'];
    //          if(check){
    //             socketref.current=await initSocket();
    //             console.log(socketref.current)
    //             socketref.current.on('connect_error', (err) => handleErrors(err));
    //             socketref.current.on('connect_failed', (err) => handleErrors(err));
    //             socketref.current.emit('join',{
    //                 roomId:id.current,
    //                 username:usernameref.current
    //             });
    //             socketref.current.on('joined',({users,username,socketId})=>{
    //                 if(username!==usernameref.current){
    //                     console.log(`${username} joined`);
    //                     toast.success(`${username} joined`);
    //                 }
    //             })
    //          }
    //       }
    //       else{
    //           navigate("/login");
    //       }
    //     }
    //     checking();
    //     return ()=>{
    //         // socketref.current.disconnect();
    //         // socketref.current.off('joined');
    //         // socketref.current.off('disconnected');
    //     }
    // },[])

    // useEffect(()=>{
    //     async function start(){

    //         socketref.current=await initSocket();
    //         console.log(socketref.current)
    //         // socketref.current.on('connect_error', (err) => handleErrors(err));
    //         // socketref.current.on('connect_failed', (err) => handleErrors(err));
    //         socketref.current.emit('join',{
    //             roomId:id.current,
    //             username:usernameref.current
    //         });
    //         socketref.current.on('joined',({users,username,socketId})=>{
    //             if(username!==usernameref.current){
    //                 console.log(`${username} joined`);
    //                 toast.success(`${username} joined`);
    //             }
    //         })
    //     }
    //     start();
    // },[usernameref])


    // useEffect( ()=>{
        // const currLocation=window.location.pathname;
    
        // const segments=currLocation.split("/");
        // id.current=segments.pop();
        // const token = localStorage.getItem('token');
        // async function checking(){
        //   if(token){
             
        //      const check=await axios.get("http://localhost:5001/token",{
        //       headers: {
        //         'x-access-token': localStorage.getItem('token'),
        //       },
        //      })
        //      if(check.data['status']==="error"){
        //       localStorage.removeItem('token');
        //       navigate("/login");
        //      }
        //      username.current=check.data['username'];
        //   }
        //   else{
        //       navigate("/login");
        //   }
        // }
        // async function getCode(){
        //     const code1=await axios.get("http://localhost:5001/cppcode",{
        //         params:{
        //             url:id
        //         },
        //         headers:{
        //             'x-access-token': localStorage.getItem('token'),
        //         }
        //     })
        // }
        // checking();
        // const handleErrors=(err)=>{
        //     console.log(err);
        // }
        // const init=async ()=>{
        //     socketref.current=await initSocket();
        //     console.log(socketref.current)
        //     socketref.current.on('connect_error', (err) => handleErrors(err));
        //     socketref.current.on('connect_failed', (err) => handleErrors(err));
        //     socketref.current.emit('join',{
        //         roomId:id,
        //         username:username.current
        //     });
        // }
        // init();
    //   },[])
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
                    {/* <div className='clientsList'>
                        {
                            clients.map((client,index)=>{
                                return( 
                                <Client username={client.username} key={index}/>
                                );
                            })
                        }
                    </div> */}
                </div>
                <button className='btn leaveBtn'>
                    leave
                </button>
            </div>
            <div>
                <CodeEditor startcode={code} updatecode={handleCodeChange}/>
                {/* <h1> hello </h1> */}
            </div>
            <div>
                {/* <div>
                    <button className='logout-button'>
                        Logout
                    </button>
                </div> */}
                <div>
                    <textarea className="dracula-textarea" placeholder="Input"></textarea>
                </div>
                <div>
                  <textarea className="dracula-textarea" placeholder="Output" readOnly></textarea>
                </div>
                <div>
                  <button className="dracula-btn">Save</button>
                  <button className="dracula-btn">Run</button>
                </div>
            </div>
            
        </div>
        
        
      )
}

export default Editor
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import axios from 'axios';
const Register = () => {
    const navigate= useNavigate();
    const [email,setEmail]= useState("")
    const [password,setPassword]=useState("")
    const [name,setName]=useState("")
    const goToLogin=(e)=>{
        e.preventDefault();
        navigate("/login")

    }
    const registerAccount=async (e)=>{
        if(name==="" || email==="" || password===""){
            toast.error("Fill all the details");
            return ;
        }
        const user=await axios.post("http://localhost:5001/createuser/",{
            name,
            email,
            password,
         }
        )
        // console.log(user.data)
        if(user.data['status']==="ok"){
            
            toast.success("registered")
            navigate("/login");
        }
        else{
            toast.error(user.data['error'])
        }
    }
    const handleEnter=(e)=>{
        if(e.code==='Enter'){
            registerAccount(e);
        }
    }
  return (
    <div className="homePageWrapper">
            <div className="formWrapper">
                <h4 className="mainLabel">Register</h4>
                <div className="inputGroup">
                    <input
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                        type="text"
                        className="inputBox"
                        placeholder="Name"
                        onKeyUp={handleEnter}
                    />
                    <input
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        type="mail"
                        className="inputBox"
                        placeholder="Email"
                        onKeyUp={handleEnter}
                    />
                    <input
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        type="password"
                        className="inputBox"
                        placeholder="Password"
                        onKeyUp={handleEnter}
                    />
                    <button className="btn joinBtn" onClick={registerAccount}>
                        Register
                    </button>
                    <span className="createInfo">
                        Already have an account &nbsp;
                        <a
                            onClick={goToLogin}
                            href=""
                            className="createNewBtn"
                        >
                            Login
                        </a>
                    </span>
                </div>
            </div>
        </div>
  )
}

export default Register
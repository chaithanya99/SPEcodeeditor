import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../utils/constants';
import { validation } from '../utils/validation';

const Login = () => {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const navigate= useNavigate()
    const goToRegister=(e)=>{
        navigate("/register")
    }
    const loginAccount=async (e)=>{
        if(email==="" || password===""){
            toast.error("Fill all the details")
            return ;
        }
        const valid=validation(email,password);
        if(valid){
            toast.error(valid);
            return;
        }
        console.log(BACKEND_URL)
        const user= await axios.post(BACKEND_URL+"/login",{
            email,
            password
        })
        if(user.data['status']==="error"){
            toast.error(user.data['error']);
            return ;
        }
        localStorage.setItem('token',user.data['user'])
        console.log(user.data['user'])
        toast.success("Login Successful")
        navigate("/dashboard")
    }
    const handleEnter=(e)=>{
        if(e.code==='Enter'){
            loginAccount(e);
        }
    }
    return (
        <div className="homePageWrapper">
                <div className="formWrapper">
                    <h4 className="mainLabel">Login</h4>
                    <div className="inputGroup">
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
                        <button className="btn joinBtn" onClick={loginAccount}>
                            Login
                        </button>
                        <span className="createInfo">
                            Don't have an account &nbsp;
                            <a
                                onClick={goToRegister}
                                href=""
                                className="createNewBtn"
                            >
                                Register
                            </a>
                        </span>
                    </div>
                </div>
            </div>
      )
}

export default Login
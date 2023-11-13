import React from 'react'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
  const navigate=useNavigate();
  const goToLogin=(e)=>{
    navigate("/login");
  }
  const goToRegister=(e)=>{
    navigate("/register");
  }
  return (
    <div className="homePageWrapper">
            <div className="formWrapper1">
                
                    <button className="btn joinBtn" onClick={goToRegister} >
                        Register
                    </button>
                    <span className="btnseparator" ></span>
                    <button className="btn joinBtn" onClick={goToLogin}>
                        Login
                    </button>
                    
            </div>
    </div>
  )
}

export default HomePage
import React from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { SlCalender } from 'react-icons/sl';
import { FcTodoList } from "react-icons/fc";

function Login({ setLoggedIn }) {
    const [goCreateAccount, setGoCreateAccount] = React.useState(false);
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const history = useNavigate();

    if (goCreateAccount) {
        return <Navigate to = "/create" />; 
    }

    async function login(e) {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3001/", {
                username, password
            })
            .then(res => {
                if (res.data === "exists") {
                    setLoggedIn(true);
                    history("/home", {state:{id:username}})
                } else if (res.data === "userExists") {
                    alert("Wrong password!")
                } else if (res.data === "doesNotExist") {
                    alert("User does not exists")
                }
            })
            
        } catch(e) {
            console.log(e);
        }
    }

    return (
    <div className="Login">

        <div className="NUSchedulers">
            <h1><SlCalender/> NUSchedulers <SlCalender/></h1>
            
        </div>

        <div className="about">
            
            <h1>Our Features</h1>
            <FcTodoList />
            <p></p>
            
        </div>


        <div className="loginPage">
            <h1>Login</h1>
        </div>
  
        <div className="login">
            <form>
        
                <i className="fa-solid fa-user"></i>
                <input type="username" onChange={(e) => { setUsername(e.target.value) }} placeholder="Username"/>
                <br/><br/>
        
                <i className="fa-solid fa-key"></i>
                 <input type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password"/>
        
                <br/><br/><br/>
        
                <input type="submit" value="Login" onClick={login}/>
                <br/><br/>
  
          
  
            </form>
  
            
            <button onClick={() => {
                setGoCreateAccount(true);
            }}
            >
                {" "}
                Create account
            </button>
      
        </div>
    </div>
    );
  }
  
  export default Login;
  
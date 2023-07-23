import React from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { SlCalender } from 'react-icons/sl';
import { FcTodoList } from "react-icons/fc";
import { FaClipboardList } from "react-icons/fa";
import { AiFillCalendar, AiOutlineCalendar } from "react-icons/ai";
import { GiPowerGenerator } from "react-icons/gi";

function Login({ setLoggedIn, setAccount }) {
    const [goCreateAccount, setGoCreateAccount] = React.useState(false);
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const history = useNavigate();

    if (goCreateAccount) {
        history(`/create`)
    }

    async function login(e) {
        e.preventDefault();
        try {
            await axios.post("https://nuschedulers.vercel.app/", {
                username, password
            })
            .then(res => {
                if (res.data === "exists") {
                    //alert(`/${username}/`)
                    setLoggedIn(true)
                    setAccount(username)
                    
                    history(`/${username}/home`)
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

        <div className="sub">
            <h1>Your personalized timetable generator and task manager</h1>
        </div>

        <div className="about">
            
            <h1><FaClipboardList /> Our Features <FaClipboardList /></h1>
  
        </div>

        <div class="feature1">
            <h2>Timetable Generator <GiPowerGenerator /></h2>
            <p>Automatically generate your ideal timetable <br></br>with the click of a button!</p>
        </div>

        <div class="feature2">
            <h2>Personalized Timetable  <AiOutlineCalendar /> </h2>
            <p>Create a customized timetable based on <br></br>your preferences and school schedule.</p>
        </div>

        <div class="feature3">
            <h2>Task Manager  <FcTodoList /></h2>
            <p>Keep track of your tasks, deadlines, <br></br>and events in one place.</p>
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
  
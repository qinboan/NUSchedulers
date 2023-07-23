import React from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { SlCalender } from "react-icons/sl";
import { MdCardMembership } from "react-icons/md";

function Create() {
    const [goLogin, setGoLogin] = React.useState(false);
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const history = useNavigate();

    if (goLogin) {
        return <Navigate to = "/" />; 
    }

    async function create(e) {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3001/create", {
                username, password
            })
            .then(res=>{
                if(res.data==="exists"){
                    alert("User already exists")
                }
                else if(res.data==="doesNotExist"){
                    history("/",{state:{id:username}})
                }
            })
            .catch(e=>{
                alert("wrong details")
                console.log(e);
            })
        } catch(e) {
            console.log(e);
        }
    }

    return (
        <div className="Login">

            <div class="NUSchedulers">
                <h1><SlCalender/> NUSchedulers <SlCalender/></h1>
            </div>

            <div className="notNew">
                <h1>Not yet a user? <br></br>
                Join us now!</h1>
            </div>

            <div className="member">
                <MdCardMembership size='10rem' color="black"/>
            </div>

            <div className="createAccount">
                <h1>Create Account</h1>
            </div>
    
            <div class="create">
                <form>
          
                    <i class="fa-solid fa-user"></i>
                    <input type="username" onChange={(e) => { setUsername(e.target.value) }} placeholder="Username"/><br/><br/>
          
                    <i class="fa-solid fa-key"></i>
                    <input type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password"/><br/><br/>
          
            
                </form>
                <br></br>

                <form action="">
                    <input type="submit" value="Create account" onClick={create}/><br/><br/>
                </form>

                <button onClick={() => {
                setGoLogin(true);
                    }}
                >
                    {" "}
                    Back to Login
                </button>

                {/* <button onClick={<Navigate to = "/home" />}>Create Account</button> */}
        
            </div>
        </div>
    );
}

export default Create;

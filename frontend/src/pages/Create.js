import React from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

function Create() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const history = useNavigate();

    async function login(e) {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3001/create", {
                username, password
            })
            .then(res=>{
                if(res.data=="exist"){
                    alert("User already exists")
                }
                else if(res.data=="notexist"){
                    history("/home",{state:{id:username}})
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
        <div>
            <div class="NUSchedulers">
                <h1>NUSchedulers</h1>
            </div>
    
            <div class="login">
                <form>
          
                    <i class="fa-solid fa-user"></i>
                    <input type="username" name="" placeholder="Username"/><br/><br/>
          
                    <i class="fa-solid fa-key"></i>
                    <input type="password" name="" placeholder="Password"/><br/><br/>

                    <i class="fa-solid fa-key"></i>
                    <input type="password" name="" placeholder="Confirm Password"/><br/><br/><br/>
          
            
                </form>

                <form action="">
                    <input type="submit" value="Create account"/><br/><br/>
                </form>

                {/* <button onClick={<Navigate to = "/home" />}>Create Account</button> */}
        
            </div>
        </div>
    );
}

export default Create;

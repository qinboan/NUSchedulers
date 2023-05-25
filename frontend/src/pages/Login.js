import React from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

function Login() {
    const [goCreateAccount, setGoCreateAccount] = React.useState(false);
    //const [goHomePage, setGoHomePage] = React.useState(false);
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    if (goCreateAccount) {
        return <Navigate to = "/create" />; 
    }

    /*if (goHomePage) {
        return <Navigate to = "/home" />;
    }*/

    async function login(e) {
        try {
            await axios.post("http://localhost:3000/", {
                username, password
            })
            .then(res => {
                if (res.data = "exists") {
                    return <Navigate to = "/home" />;
                } else if (res.data = "doesNotExist") {
                    alert("User does not exists")
                }
            })
            
        } catch(e) {
            console.log(e);
        }
    }

    return (
    <div>

        <div className="NUSchedulers">
            <h1>NUSchedulers</h1>
        </div>
  
        <div className="login">
            <form>
        
                <i className="fa-solid fa-user"></i>
                <input type="username" name="" placeholder="Username"/>
                <br/><br/>
        
                <i className="fa-solid fa-key"></i>
                 <input type="password" name="" placeholder="Password"/>
        
                <br/><br/><br/>
        
                <input type="submit" value="Login"/>
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
  
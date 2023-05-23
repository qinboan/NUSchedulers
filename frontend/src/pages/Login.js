import React from "react";
import { Navigate } from "react-router-dom";

function Login() {
    const [goCreateAccount, setGoCreateAccount] = React.useState(false);

    if (goCreateAccount) {
        return <Navigate to = "/create" />; 
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
  
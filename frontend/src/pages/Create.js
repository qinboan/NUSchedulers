import React from "react";

function Create() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    async function login(e) {
        try {
            await axios.post("http://localhost:3000/create", {
                username, password
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
        
            </div>
        </div>
    );
}

export default Create;

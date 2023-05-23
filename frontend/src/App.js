import logo from './logo.svg';
import './App.css';

function App() {
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

      <a href="create.html">
        <button>Create account</button>
      </a>
    
    </div>
  </div>
  );
}

export default App;

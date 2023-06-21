//import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Create from './pages/Create';
import Home from './pages/Home';
import Generate from './pages/Generate';
import Filter from './pages/Filter';
import Edit from './pages/Edit';
import Authentication from './pages/Authentication';
import Modules from './pages/Modules';

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  return (
    //<AuthProvider>
    <Router>
      <Routes>
        <Route path = "/" element = { <Login setLoggedIn={setLoggedIn}/> } />
        <Route path = "/create" element = { <Create /> } />
        <Route element = { <Authentication loggedIn={loggedIn}/> }>
          <Route path = "/home" element = { <Home /> } />
          <Route path = "/generate" element = { <Generate /> } />
          <Route path = "/filter" element = { <Filter /> } />
          <Route path = "/edit" element = { <Edit /> } />
        </Route>
        <Route path = "/modules" element = { <Modules /> } />
      </Routes>
    </Router>
    //</AuthProvider>
    
  );
}

export default App;

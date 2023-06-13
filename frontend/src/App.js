//import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Create from './pages/Create';
import Home from './pages/Home';
import Generate from './pages/Generate';
import Filter from './pages/Filter';
import Edit from './pages/Edit';

function App() {
  return (
    <Router>
      <Routes>
        <Route path = "/" element = { <Login /> } />
        <Route path = "/create" element = { <Create /> } />
        <Route path = "/home" element = { <Home /> } />
        <Route path = "/generate" element = { <Generate /> } />
        <Route path = "/filter" element = { <Filter /> } />
        <Route path = "/edit" element = { <Edit /> } />
      </Routes>
    </Router>
  );
}

export default App;

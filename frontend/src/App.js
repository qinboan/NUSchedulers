import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Create from './pages/Create';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path = "/" element = { <Login /> } />
        <Route path = "/create" element = { <Create /> } />
        <Route path = "/home" element = { <Home /> } />
      </Routes>
    </Router>
  );
}

export default App;

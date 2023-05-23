import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Create from './pages/Create';

function App() {
  return (
    <Router>
      <Routes>
        <Route path = "/" element = { <Login /> } />
        <Route path = "/create" element = { <Create /> } />
      </Routes>
    </Router>
  );
}

export default App;

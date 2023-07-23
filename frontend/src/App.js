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
import Timetable from './pages/Timetable';
import EditButtons from './pages/EditButtons';

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [account, setAccount] = useState('')
  const [filterOptions, setFilterOptions] = useState({});
  //const [timetableData, setTimetableData] = useState([]);
  //const [showTimetable, setShowTimetable] = useState(false);
  return (
    <Router>
      <Routes>
        <Route path = "/" element = { <Login setLoggedIn={setLoggedIn} setAccount={setAccount}/> } />
        <Route path = "/create" element = { <Create /> } />
        <Route element = { <Authentication loggedIn={loggedIn}/> }>
          <Route path = "/:account/home" element = { <Home account={account} /> } />
          <Route path = "/:account/generate" element = { <Generate account={account}/> } />
          <Route path = "/:account/filter" element = { <Filter setFilterOptions={setFilterOptions} account={account} /> } />
          <Route path = "/:account/edit" element = { <Edit account={account}/> } />
          <Route path = "/:account/timetable" element = { <Timetable /> } />
          <Route path = "/:account/editbuttons" element = { <EditButtons /> } />
        </Route>
        <Route path = "/modules" element = { <Modules /> } />
      </Routes>
    </Router>
    
  );
}

export default App;

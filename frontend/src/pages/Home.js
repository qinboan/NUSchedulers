import React from "react";
import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import Timetable from "./Timetable";
import TaskList from './TaskList';



function Home({account}) {

    //alert(`/${account}/`)

    const [check, setCheck] = useState(false);
    const [edit, setEdit] = useState(false);
    const [generate, setGenerate] = useState(false);
    const [timetableData, setTimetableData] = useState([]);
    const [showTimetable, setShowTimetable] = useState(false);
    const [modules, setModules] = useState([]);
    const changeCheck = !check;

    //const history = useNavigate();

    // useEffect(() => {
    //     // Reset the generate state to false after the navigation to the "Generate" page
    //     setGenerate(false);
    //   }, [generate]);

    useEffect(() => {
        // Function to fetch the timetable data from your backend API
        const fetchTimetableData = async () => {
          try {
            const response = await axios.get(`http://localhost:3001/timetable/${account}`);
            setTimetableData(response.data.timetableData); // Store the fetched data in the state
            setModules(response.data.modules)
            setShowTimetable(true); // Set showTimetable to true to display the timetable
          } catch (error) {
            console.error("Error fetching timetable data:", error);
          }
        };
    
        fetchTimetableData(); // Call the fetchTimetableData function when the component mounts
    }, [account]);
    const [todo, setTodo] = useState('');

    const handleTodo = e => {
        e.preventDefault();

        setTodo('');
    }

    const handleAddTodo = e => {
        setTodo(e.target.value);
    }

    if (edit) {
        return <Navigate to = {`/${account}/edit`} />; 
    }

    if (generate) {
        //alert(`/${account}/generate`)
        return <Navigate to = {`/${account}/generate`} />; 
        //history(`/${username}/generate`)
    }

    return (
        <div className="Home">
            <div className="Header">
                <h1>Welcome, {account}!</h1>
            </div>
            
            {/* <div className="Schedule">
                <h1>My Schedule</h1>
            </div> */}

            <div className="Modules-home">
                <h1>Modules Selected</h1>
                {modules.map((module, index) => (
                    <pre key={index}>{module}</pre>
                ))}   
            </div>

            <div className="Tasks">
                <h1>Tasks</h1>
            </div>

            {/* <div className="today">
                <h1>Today</h1>
                <input type = "checkbox" checked = {check} onClick={() => setCheck(changeCheck)}/>
                <label>Assignment</label>
            </div>

            <div className="tomorrow">
                <h1>Tomorrow</h1>
                <input type = "checkbox" checked = {check} onClick={() => setCheck(changeCheck)}/>
                <label>Assignment</label>
            </div> */}
{/* 
            <table className="table" style={{ marginTop: 10 }}>
                <thead>
                    <tr>
                    <th>Task</th>
                    <th>Due Date</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>{recordList()}</tbody>
            </table> */}

            {/* <form className="TodoList" onSubmit={handleTodo}>
                <input type="text" className="todo" 
                    placeholder="New Task" onChange={handleAddTodo}/>
                <button type="submit" className="addTodo">Add Task</button>
            </form> */}

            <div className="tasks">
                <TaskList />
            </div>


            <div className="editTimetable">
                <button onClick={() => {
                    setEdit(true);
                }}
                >
                    {" "}
                    Edit Timetable
                </button>
            </div>

            <div className="generateTimetable">
                <button onClick={() => {
                    setGenerate(true);
                }}
                >
                    {" "}
                    Generate Timetable
                </button>
            </div>

            {showTimetable ? <Timetable timetableData={timetableData} /> : null}

            {/* {showTimetable && (
                <div className="timetabledata">
                    <h4>TimeTable Data: </h4>
                    <pre>{JSON.stringify(timetableData, null, 2)}</pre>
                </div>
            )} */}

        </div>
    )
}

export default Home;
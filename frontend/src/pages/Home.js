import React from "react";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Timetable from "./Timetable";
import TaskList from './TaskList';



function Home({timetableData, showTimetable}) {

    const [check, setCheck] = useState(false);
    const [edit, setEdit] = useState(false);
    const [generate, setGenerate] = useState(false);
    const changeCheck = !check;

    const [todo, setTodo] = useState('');

    const handleTodo = e => {
        e.preventDefault();

        setTodo('');
    }

    const handleAddTodo = e => {
        setTodo(e.target.value);
    }

    if (edit) {
        return <Navigate to = "/edit" />; 
    }

    if (generate) {
        return <Navigate to = "/generate" />; 
    }

    return (
        <div className="Home">
            <div className="Schedule">
                <h1>My Schedule</h1>
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
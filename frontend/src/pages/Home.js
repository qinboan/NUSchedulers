import React from "react";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Timetable from "./Timetable";


function Home({timetableData, showTimetable}) {

    const [check, setCheck] = useState(false);
    const [edit, setEdit] = useState(false);
    const [generate, setGenerate] = useState(false);
    const changeCheck = !check;

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

            <div className="Deadlines">
                <h1>Deadlines</h1>
            </div>

            <div className="today">
                <h1>Today</h1>
                <input type = "checkbox" checked = {check} onClick={() => setCheck(changeCheck)}/>
                <label>Assignment</label>
            </div>

            <div className="tomorrow">
                <h1>Tomorrow</h1>
                <input type = "checkbox" checked = {check} onClick={() => setCheck(changeCheck)}/>
                <label>Assignment</label>
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

        </div>
    )
}

export default Home;
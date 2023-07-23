import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";

function Edit(account) {

    const [cancel, setCancel] = useState(false);
    const [save, setSave] = useState(false);
    const [timetableData, setTimetableData] = useState([]);
    const [modules, setModules] = useState([]);
    const [fetched, setFetched] = useState(false);


    useEffect(() => {
        // Function to fetch the timetable data from your backend API
        const fetchTimetableData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/timetable/${account}`);
                setTimetableData(response.data.timetableData); // Store the fetched data in the state
                setModules(response.data.modules)
            } catch (error) {
                console.error("Error fetching timetable data:", error);
            }
        };
    
        fetchTimetableData(); // Call the fetchTimetableData function when the component mounts
    }, [account.account]);

    useEffect(() => {
        const sortedTimetableData = [...timetableData].sort((a, b) => a.moduleCode.localeCompare(b.moduleCode));
        setTimetableData(sortedTimetableData);
    }, [timetableData]);

    if (cancel) {
        return <Navigate to = {`/${account.account}/home`} />; 
    }

    if (save) {
        return <Navigate to = {`/${account.account}/home`} />; 
    }

    //timetableData.sort((a, b) => a.moduleCode.localeCompare(b.moduleCode));

    return (
        <div>
            <div className="Edit">
                <h1>Edit Timetable</h1>
            </div>

            <div className="edit-container">
                <h1>Edit Timetable</h1>
                {timetableData.map((classData, index) => (
                    <div key={index} className="class-dropdown">
                        <div className="dropdown-header">
                            <span>{classData.moduleCode}</span>
                            <span>{classData.lessonType}</span>
                        </div>
                        <div className="dropdown-content">
                            {classData.schedule.map((schedule, idx) => (
                                <div key={idx} className="class-schedule">
                                    <p>Class No: {schedule.classNo}</p>
                                    <p>Day: {schedule.day}</p>
                                    <p>Start Time: {schedule.startTime}</p>
                                    <p>End Time: {schedule.endTime}</p>
                                    <p>Venue: {schedule.venue}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="cancel">
                <button onClick={() => {
                    setCancel(true);
                }}
                >
                    {" "}
                    Cancel
                </button>
            </div>

            <div className="saveTimetable">
                <button onClick={() => {
                    setSave(true);
                }}
                >
                    {" "}
                    Save
                </button>
            </div>
        </div>
    )
}

export default Edit;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import EditButtons from "./EditButtons";

function Edit(account) {

    const [cancel, setCancel] = useState(false);
    const [save, setSave] = useState(false);
    const [timetableData, setTimetableData] = useState([]);
    const [updatedData, setUpdatedData] = useState([]);
    const [modules, setModules] = useState([]);
    const [fetched, setFetched] = useState(false);

    const acc = account.account;


    useEffect(() => {
        // Function to fetch the timetable data from your backend API
        const fetchTimetableData = async () => {
            try {
                const response = await axios.get(`https://nuschedulers.vercel.app/timetable/${acc}`);
                setTimetableData(response.data.timetableData); // Store the fetched data in the state
                setUpdatedData(response.data.timetableData);
                setModules(response.data.modules)
                setFetched(true);
            } catch (error) {
                console.error("Error fetching timetable data:", error);
            }
        };
    
        fetchTimetableData(); // Call the fetchTimetableData function when the component mounts
    }, [acc]);

    // useEffect(() => {
    //     const sortedTimetableData = [...timetableData].sort((a, b) => a.moduleCode.localeCompare(b.moduleCode));
    //     setTimetableData(sortedTimetableData);
    // }, [timetableData]);

    const handleSave = async () => {   
        try {
            await axios.post("https://nuschedulers.vercel.app/timetable", {
                username: acc,
                modules: modules,
                timetableData: updatedData,
            });
            setSave(true);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    };

    if (cancel) {
        return <Navigate to = {`/${acc}/home`} />; 
    }

    if (save) {
        return <Navigate to = {`/${acc}/home`} />; 
    }

    if (!fetched) {
        return <div>Loading...</div>;
    }

    const sortedTimetableData = [...timetableData].sort((a, b) =>
        a.moduleCode.localeCompare(b.moduleCode)
    );


    return (
        <div>
            <div className="Edit">
                <h1>Edit Timetable</h1>
            </div>

            <EditButtons updatedData={updatedData} setUpdatedData={setUpdatedData}/>

            <div className="cancelTimetable">
                <button onClick={() => {
                    setCancel(true);
                }}
                >
                    {" "}
                    Cancel
                </button>
            </div>

            <div className="saveTimetable">
                <button onClick={handleSave}
                >
                    {" "}
                    Save
                </button>
            </div>

            {/* <div className="timetabledata">
                <h4>TimeTable Data: </h4>
                <pre>{JSON.stringify(updatedData, null, 2)}</pre>
            </div> */}
        </div>
    )
}

export default Edit;
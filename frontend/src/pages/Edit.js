import React, { useState } from "react";
// import axios from "axios";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";

function Edit() {

    const [cancel, setCancel] = useState(false);
    const [save, setSave] = useState(false);

    if (cancel) {
        return <Navigate to = "/home" />; 
    }

    if (save) {
        return <Navigate to = "/home" />; 
    }

    return (
        <div>
            <div className="Edit">
                <h1>Edit Timetable</h1>
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
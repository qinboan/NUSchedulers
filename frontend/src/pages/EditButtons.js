import React from "react";

function EditButtons({ timetableData }) {
  // Step 1: Sort the timetableData by moduleCode
    timetableData.sort((a, b) => a.moduleCode.localeCompare(b.moduleCode));

    return (
        <div className="edit-container">
            <h1>Edit Timetable</h1>
            {timetableData.map((classData, index) => (
                <div key={index} className="class-dropdown">
                    {/* Step 2: Create a dropdown bar for each class */}
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
    );
}

export default EditButtons;

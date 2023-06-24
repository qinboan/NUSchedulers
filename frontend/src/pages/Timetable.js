import React from 'react';

function Timetable({ timetableData }) {
    return (
        <div className="timetable">
            <h2>Timetable</h2>
            {/* Render the timetable data */}
            {timetableData.map((classItem) => (
                <div key={classItem.classNo}>
                    <h3>{classItem.moduleCode}</h3>
                    <p>{classItem.lessonType} - {classItem.classNo}</p>
                    <ul>
                        {classItem.schedule.map((scheduleItem) => (
                            <li key={`${scheduleItem.day}-${scheduleItem.startTime}-${scheduleItem.endTime}`}>
                                {scheduleItem.day} | {scheduleItem.startTime} - {scheduleItem.endTime} | {scheduleItem.venue}
                            </li>
                        ))}
                    </ul>
                    <hr />
                </div>
            ))}
        </div>
    );
}

export default Timetable;

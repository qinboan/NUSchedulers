import React from 'react';
import Generate from './Generate';

function Timetable({ timetableData }) {

    //const timetableData = location.state ? location.state.timetableData : [];

    if (timetableData.length === 0) {
        console.log("No timetable data available.");
    }

    return (
        <div className="timetable">
            <h2>Timetable</h2>
            {timetableData.map((classItem) => (
                <div key={classItem.classNo} className="class-item">
                    <h3>{classItem.moduleCode}</h3>
                    <p>{classItem.lessonType} - {classItem.classNo}</p>
                    <table>
                        <thead>
                            <tr>
                                <th>Time</th>
                                <th>Monday</th>
                                <th>Tuesday</th>
                                <th>Wednesday</th>
                                <th>Thursday</th>
                                <th>Friday</th>
                            </tr>
                        </thead>
                        <tbody>
                            {classItem.schedule.map((scheduleItem) => (
                                <tr key={`${scheduleItem.day}-${scheduleItem.startTime}-${scheduleItem.endTime}`}>
                                    <td>{scheduleItem.startTime} - {scheduleItem.endTime}</td>
                                    <td>{scheduleItem.day === 'Monday' ? scheduleItem.venue : ''}</td>
                                    <td>{scheduleItem.day === 'Tuesday' ? scheduleItem.venue : ''}</td>
                                    <td>{scheduleItem.day === 'Wednesday' ? scheduleItem.venue : ''}</td>
                                    <td>{scheduleItem.day === 'Thursday' ? scheduleItem.venue : ''}</td>
                                    <td>{scheduleItem.day === 'Friday' ? scheduleItem.venue : ''}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <hr />
                </div>
            ))}
        </div>
    );
}

export default Timetable;

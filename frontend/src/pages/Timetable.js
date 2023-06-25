import React from 'react';

function Timetable({ timetableData }) {
    if (timetableData.length === 0) {
      console.log("No timetable data available.");
    }
  
    // Define the order of the days of the week
    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  
    // Create an empty object to store the compiled weekly timetable data
    const weeklyTimetable = {};
  
    // Iterate through each class item
    timetableData.forEach((classItem) => {
      // Iterate through each schedule item for the current class item
      classItem.schedule.forEach((scheduleItem) => {
        const { day, startTime, endTime, venue } = scheduleItem;
  
        // Check if the day already exists in the weekly timetable object
        if (weeklyTimetable.hasOwnProperty(day)) {
          // Check if the time already exists for the specific day
          if (weeklyTimetable[day].hasOwnProperty(startTime)) {
            weeklyTimetable[day][startTime].push({
              moduleCode: classItem.moduleCode,
              lessonType: classItem.lessonType,
              classNo: classItem.classNo,
              endTime: endTime,
              venue: venue,
            });
          } else {
            weeklyTimetable[day][startTime] = [
              {
                moduleCode: classItem.moduleCode,
                lessonType: classItem.lessonType,
                classNo: classItem.classNo,
                endTime: endTime,
                venue: venue,
              },
            ];
          }
        } else {
          weeklyTimetable[day] = {
            [startTime]: [
              {
                moduleCode: classItem.moduleCode,
                lessonType: classItem.lessonType,
                classNo: classItem.classNo,
                endTime: endTime,
                venue: venue,
              },
            ],
          };
        }
      });
    });
  
    // Sort the compiled timetable by day and time
    const compiledTimetable = Object.keys(weeklyTimetable)
      .sort((a, b) => daysOfWeek.indexOf(a) - daysOfWeek.indexOf(b))
      .reduce((result, day) => {
        const sortedTimes = Object.keys(weeklyTimetable[day]).sort();
        const sortedClasses = sortedTimes.reduce((classes, time) => {
          classes.push({
            time: time,
            classes: weeklyTimetable[day][time],
          });
          return classes;
        }, []);
        result.push({
          day: day,
          classes: sortedClasses,
        });
        return result;
      }, []);
  
    return (
      <div className="timetable">
        {compiledTimetable.map(({ day, classes }) => (
          <div key={day} className="day-item">
            <h3>{day}</h3>
            {classes.map(({ time, classes }) => (
              <div key={`${day}-${time}`} className="time-item">
                <table>
                  <thead>
                    <tr>
                      {/* <th>Class No</th> */}
                      <th>Module Code</th>
                      <th>Lesson Type</th>
                      <th>Start Time</th>
                      <th>End Time</th>
                      {/* <th>Venue</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {classes.map(({ moduleCode, lessonType, classNo, endTime, venue }) => (
                      <tr key={`${day}-${time}-${classNo}`}>
                        {/* <td>{classNo}</td> */}
                        <td>{moduleCode}</td>
                        <td>{lessonType}</td>
                        <td>{time}</td>
                        <td>{endTime}</td>
                        {/* <td>{venue}</td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
            <hr />
          </div>
        ))}
      </div>
    );
  }
  
export default Timetable;

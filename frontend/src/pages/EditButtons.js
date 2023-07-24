import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EditButtons({ updatedData, setUpdatedData }) {

    //const [updatedData, setUpdatedData] = useState(timetableData);

    if (updatedData.length === 0) {
      console.log("No timetable data available.");
    }
  
    // Define the order of the days of the week
    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  
    // Create an empty object to store the compiled weekly timetable data
    const weeklyTimetable = {};
  
    // Iterate through each class item
    updatedData.forEach((classItem) => {
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

    const [selectedClass, setSelectedClass] = useState(null);
    const [otherPossibleClasses, setOtherPossibleClasses] = useState([]);
    const [newClassNo, setNewClassNo] = useState(null);
    const [newClass, setNewClass] = useState([]);
    const [classUpdated, setClassUpdated] = useState(false);

    const handleReplaceClass = (day, time, classNo, moduleCode, lessonType) => {
        setSelectedClass({ day, time, classNo, moduleCode, lessonType });
    };
    
    const handleClassChange = () => {
        if(selectedClass && newClassNo) {
            // Find the relevant module in timetableData
            otherClassesData(selectedClass.moduleCode, selectedClass.lessonType, newClassNo);
            //alert("classChange")
            const updatedTimetableData = updatedData.map((module) => {
                if (module.moduleCode === selectedClass.moduleCode && module.lessonType === selectedClass.lessonType) {
                    // Find the relevant schedule in the module
                    // const updatedSchedule = module.schedule.map((scheduleItem) => {
                    // if (scheduleItem.classNo === newClass.classNo && scheduleItem.day === newClass.day) {
                    //     // Update the schedule item with the new class information
                        
                    //     return {
                    //     ...scheduleItem,
                    //     classNo: newClass.classNo,
                    //     startTime: newClass.startTime,
                    //     endTime: newClass.endTime,
                    //     venue: newClass.venue,
                    //     };
                    // } else {
                    //     return scheduleItem; // If not the relevant schedule, return as-is
                    // }
                    // });
            
                    // Update the module with the updated schedule
                    // return {
                    // ...module,
                    // schedule: updatedSchedule,
                    // };

                    
                    //alert(JSON.stringify(newClass));
                    const updatedSchedule = module.schedule.map((scheduleItem) => {
                            // Update the schedule item with the new class information
                        return {
                            ...scheduleItem,
                            classNo: newClass.classNo,
                            day: newClass.day,
                            startTime: newClass.startTime,
                            endTime: newClass.endTime,
                            venue: newClass.venue,
                        };
                    });

                    return {
                        ...module,
                        schedule: updatedSchedule,
                    }

                } else {
                    return module; // If not the relevant module, return as-is
                }
            });
        
            // Set the updated timetableData state with the modified data
            setUpdatedData(updatedTimetableData);
            //alert(JSON.stringify(updatedTimetableData));
            setSelectedClass(null);
            setNewClass(null);
        }
    };
      

    useEffect(() => {
        if (selectedClass) {
            // Fetch other possible classes based on the module code and lesson type
            fetchOtherPossibleClasses(selectedClass.moduleCode, selectedClass.lessonType);
        }
    }, [selectedClass]);

    const otherClassesData = async (moduleCode, lessonType, otherClassNo) => {
        try {
            // Make an API call to fetch other possible classes
            const response = await axios.get(`https://api.nusmods.com/v2/2023-2024/modules/${moduleCode}.json`);
            const moduleData = response.data;
            const semester = moduleData.semesterData.find((semester) => semester.semester === 1);

            //alert(JSON.stringify(semester));
            semester.timetable.forEach((classItem) => {
                if (classItem.lessonType === lessonType) {
                    //alert("found")
                    if(classItem.classNo === otherClassNo){
                        setNewClass(classItem);
                        setClassUpdated(true);
                        return;
                    }
                }
            });
            //alert(JSON.stringify(options));
        } catch (error) {
            console.error('Error fetching other possible classes:', error);
        }
    }

    const fetchOtherPossibleClasses = async (moduleCode, lessonType) => {
        try {
            // Make an API call to fetch other possible classes
            const response = await axios.get(`https://api.nusmods.com/v2/2023-2024/modules/${moduleCode}.json`);
            const moduleData = response.data;
            const semester = moduleData.semesterData.find((semester) => semester.semester === 1);
            const options = [];

            //alert(JSON.stringify(semester));
            semester.timetable.forEach((classItem) => {
                if (classItem.lessonType === lessonType) {
                    //alert("found")
                    options.push({
                        classNo: classItem.classNo,
                        day: classItem.day,
                        startTime: classItem.startTime,
                        endTime: classItem.endTime,
                        venue: classItem.venue,
                    });
                }
            });
            //alert(JSON.stringify(options));
            setOtherPossibleClasses(options);
        } catch (error) {
            console.error('Error fetching other possible classes:', error);
            setOtherPossibleClasses([]);
        }
    };
  
    return (
        <div className="timetable-edit">
            {compiledTimetable.map(({ day, classes }) => (
                <div key={day} className="day-item">
                <h3>{day}</h3>
                {classes.map(({ time, classes }) => (
                    <div key={`${day}-${time}`} className="time-item">
                    <table>
                        <thead>
                        <tr>
                            <th>Module Code</th>
                            <th>Lesson Type</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>Replace</th>
                        </tr>
                        </thead>
                        <tbody>
                        {classes.map(({ moduleCode, lessonType, classNo, endTime }) => (
                            <tr key={`${day}-${time}-${classNo}`}>
                            <td>{moduleCode}</td>
                            <td>{lessonType}</td>
                            <td>{time}</td>
                            <td>{endTime}</td>
                            <td>
                                {selectedClass && selectedClass.day === day && selectedClass.time === time && selectedClass.classNo === classNo ? (
                                <div>
                                    <select onChange={(e) => setNewClassNo(e.target.value)} value={newClassNo}>
                                    <option value="">
                                        Select a new class
                                    </option>
                                    {/* Render the list of other possible classes as options */}
                                    {otherPossibleClasses.map((otherClass) => (
                                        <option key={otherClass.classNo} value={otherClass.classNo}>
                                        {otherClass.day + " " + otherClass.startTime + " - " + otherClass.endTime}
                                        </option>
                                    ))}
                                    </select>
                                    <button onClick={handleClassChange}>Save</button>
                                    <button onClick={() => setSelectedClass(null)}>Cancel</button>
                                </div>
                                ) : (
                                <button onClick={() => handleReplaceClass(day, time, classNo, moduleCode, lessonType)}>Replace</button>
                                )}
                            </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    </div>
                ))}
                <hr />
                </div>
            ))}

        {/* <Timetable timetableData={updatedData} /> */}
        </div>
    );
}
  
export default EditButtons;

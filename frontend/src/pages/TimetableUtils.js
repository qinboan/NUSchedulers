export function generateTimetableData(modules) {

    //alert("found");
    const timetable = {};
    modules.forEach((module) => {
        //alert("found modules");
        module.semesterData.forEach((semester) => {
            //alert("found semester");
            semester.timetable.forEach((classItem) => {
                if (
                    //classItem.moduleCode &&
                    classItem.lessonType &&
                    classItem.classNo &&
                    classItem.day &&
                    classItem.startTime &&
                    classItem.endTime &&
                    classItem.venue
                ) {
                    //alert("found");
                    const classKey = `${module.moduleCode} - ${classItem.lessonType}`;
  
                    if (!timetable[classKey]) {
                        timetable[classKey] = {
                            lessonType: classItem.lessonType,
                            classNo: classItem.classNo,
                            moduleCode: module.moduleCode,
                            schedule: [],
                        };

                        timetable[classKey].schedule.push({
                            day: classItem.day,
                            startTime: classItem.startTime,
                            endTime: classItem.endTime,
                            venue: classItem.venue,
                        });
                    }
  
                    
                } else {
                    console.error('Missing or invalid data for generating timetable:', classItem);
                    // Handle the missing or invalid data as needed
                    //alert(toString(classItem));
                }   
            });
        });
    });
  
    return Object.values(timetable);
}
  
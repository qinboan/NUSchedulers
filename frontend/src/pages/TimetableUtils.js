export function generateTimetableData(modules) {
    // Initialize an empty timetable object
    const timetable = {};
      
    // Iterate over each selected module
    modules.forEach((module) => {
        // Iterate over the semester data for the module
        module.semesterData.forEach((semester) => {
            // Iterate over the classes for the semester
            semester.timetable.forEach((classItem) => {
                // Generate a unique key for the class based on its attributes
                const classKey = `${classItem.lessonType}-${classItem.classNo}`;
      
                // Create a new class object if it doesn't exist in the timetable
                if (!timetable[classKey]) {
                    timetable[classKey] = {
                        lessonType: classItem.lessonType,
                        classNo: classItem.classNo,
                        moduleCode: module.moduleCode,
                        schedule: [],
                    };
                }
      
                // Add the class schedule to the timetable
                timetable[classKey].schedule.push({
                    day: classItem.day,
                    startTime: classItem.startTime,
                    endTime: classItem.endTime,
                    venue: classItem.venue,
                });
            });
        });
    });
      
    return Object.values(timetable);
}
      

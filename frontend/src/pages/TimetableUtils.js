export function generateTimetableData(modules) {
    const timetable = {};
  
    modules.forEach((module) => {
        module.semesterData.forEach((semester) => {
            semester.timetable.forEach((classItem) => {
                if (
                    classItem.moduleCode &&
                    classItem.lessonType &&
                    classItem.classNo &&
                    classItem.day &&
                    classItem.startTime &&
                    classItem.endTime &&
                    classItem.venue
                ) {
                    const classKey = `${classItem.lessonType}-${classItem.classNo}`;
  
                    if (!timetable[classKey]) {
                        timetable[classKey] = {
                            lessonType: classItem.lessonType,
                            classNo: classItem.classNo,
                            moduleCode: classItem.moduleCode,
                            schedule: [],
                        };
                    }
  
                    timetable[classKey].schedule.push({
                        day: classItem.day,
                        startTime: classItem.startTime,
                        endTime: classItem.endTime,
                        venue: classItem.venue,
                    });
                } else {
                    console.error('Missing or invalid data for generating timetable:', classItem);
                    // Handle the missing or invalid data as needed
                }
            });
        });
    });
  
    return Object.values(timetable);
}
  
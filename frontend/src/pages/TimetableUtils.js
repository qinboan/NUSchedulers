export function generateTimetableData(timetableDataArray, filterOptions, second) {
    const classes = {};
    const timetable = {};
    const days = {};
    let conflict = false;
    let allpref = false;
    const avoid = filterOptions.day;
    const start = filterOptions.start === '' ? '0000' : filterOptions.start;
    const end = filterOptions.end === '' ? '2359' : filterOptions.end;


    // alert(JSON.stringify(avoid));
    // alert(start);
    // alert(end);

  
    timetableDataArray.forEach((module) => {
        //module.semesterData.forEach((semester) => {
        const semester = module.semesterData.find((semester) => semester.semester === 1);
        if (semester){
            semester.timetable.forEach((classItem) => {
                const classKey = `${module.moduleCode} + ${classItem.lessonType}`;

  
                if (!classes[classKey]) {
                    classes[classKey] = {
                        lessonType: classItem.lessonType,
                        moduleCode: module.moduleCode,
                        schedule: [],
                    };
                }

                classes[classKey].schedule.push({
                    classNo: classItem.classNo,
                    day: classItem.day,
                    startTime: classItem.startTime,
                    endTime: classItem.endTime,
                    venue: classItem.venue,
                });
            });
        }
    });

    const sortedClasses = Object.values(classes).sort((a, b) => {
        const countA = a.schedule.length;
        const countB = b.schedule.length;
        return countA - countB;
    });

    sortedClasses.forEach((classItem) => {

        const classKey = `${classItem.moduleCode} + ${classItem.lessonType}`;
        if (!timetable[classKey]) {
            timetable[classKey] = {
                lessonType: classItem.lessonType,
                moduleCode: classItem.moduleCode,
                schedule: [],
            };
        }

        //alert(classItem.moduleCode + " " + classItem.lessonType);
        let unablePref = false;
        let possibleClasses = false;

        classItem.schedule.forEach((classInformation, index, arr) => {
            const hasOverlap = Object.values(timetable).some((otherClass) => {
                return otherClass.schedule.some((scheduleItem) => {
                    const overlap =
                        classInformation.day === scheduleItem.day &&
                        (
                            (classInformation.startTime >= scheduleItem.startTime && classInformation.startTime < scheduleItem.endTime) ||
                            (classInformation.endTime > scheduleItem.startTime && classInformation.endTime <= scheduleItem.endTime) ||
                            (classInformation.startTime <= scheduleItem.startTime && classInformation.endTime >= scheduleItem.endTime)
                        );
    
                    return overlap;
                });
            });

            const checkPref = Object.values(avoid).every((avoidDay) => {
                return (
                    classInformation.day !== avoidDay &&
                    classInformation.startTime >= start &&
                    classInformation.endTime <= end
                );
            });

    
            if (timetable[classKey].schedule.length === 0) {

                if ((index + 1 === arr.length && !checkPref)) {
                    unablePref = true;
                    allpref = true;
                } 

                else if (index + 1 === arr.length && possibleClasses) {
                    unablePref = true;
                    allpref = true;
                }

                else if (index + 1 === arr.length) {

                    if (hasOverlap && !possibleClasses) {
                        conflict = true;
                        //alert("1")
                    }

                    //alert("bopes")

                    timetable[classKey].schedule.push({
                        classNo: classInformation.classNo,
                        day: classInformation.day,
                        startTime: classInformation.startTime,
                        endTime: classInformation.endTime,
                        venue: classInformation.venue,
                    });

                    classItem.schedule.forEach((other) => {
                        if (classInformation.classNo === other.classNo) {

                            if (classInformation.day !== other.day || classInformation.startTime !== other.startTime) {

                                const hasOverlap = Object.values(timetable).some((otherClass) => {
                                    return otherClass.schedule.some((scheduleItem) => {
                                        const overlap =
                                            other.day === scheduleItem.day &&
                                            (
                                                (other.startTime >= scheduleItem.startTime && other.startTime < scheduleItem.endTime) ||
                                                (other.endTime > scheduleItem.startTime && other.endTime <= scheduleItem.endTime) ||
                                                (other.startTime <= scheduleItem.startTime && other.endTime >= scheduleItem.endTime)
                                            );
                
                                        return overlap;
                                    });
                                });

                                if (!hasOverlap) {
                                    timetable[classKey].schedule.push({
                                        classNo: other.classNo,
                                        day: other.day,
                                        startTime: other.startTime,
                                        endTime: other.endTime,
                                        venue: other.venue,
                                    });
                                } else {
                                    console.log(`No suitable class found for ${classItem.lessonType}`);
                                    //alert("Conflicting first other class");
                                    conflict = true;
                                    timetable[classKey].schedule.push({
                                        classNo: other.classNo,
                                        day: other.day,
                                        startTime: other.startTime,
                                        endTime: other.endTime,
                                        venue: other.venue,
                                    });
                                }
                            }
                        }
                    })
                }

                else if ((!hasOverlap && checkPref )) {
                    //alert("found")
                    let check = false;

                    classItem.schedule.forEach((other) => {
                        if (classInformation.classNo === other.classNo) {

                            if (classInformation.day !== other.day || classInformation.startTime !== other.startTime) {

                                const hasOverlap = Object.values(timetable).some((otherClass) => {
                                    return otherClass.schedule.some((scheduleItem) => {
                                        const overlap =
                                            other.day === scheduleItem.day &&
                                            (
                                                (other.startTime >= scheduleItem.startTime && other.startTime < scheduleItem.endTime) ||
                                                (other.endTime > scheduleItem.startTime && other.endTime <= scheduleItem.endTime) ||
                                                (other.startTime <= scheduleItem.startTime && other.endTime >= scheduleItem.endTime)
                                            );
                
                                        return overlap;
                                    });
                                });

                                const checkPref = Object.values(avoid).every((avoidDay) => {
                                    return (
                                        other.day !== avoidDay &&
                                        other.startTime >= start &&
                                        other.endTime <= end
                                    );
                                });

                                if (!hasOverlap && checkPref) {
                                    timetable[classKey].schedule.push({
                                        classNo: other.classNo,
                                        day: other.day,
                                        startTime: other.startTime,
                                        endTime: other.endTime,
                                        venue: other.venue,
                                    });
                                } else {
                                    check = true;
                                }
                            }
                        }
                    })

                    if (!check) {
                        timetable[classKey].schedule.push({
                            classNo: classInformation.classNo,
                            day: classInformation.day,
                            startTime: classInformation.startTime,
                            endTime: classInformation.endTime,
                            venue: classInformation.venue,
                        });
                    }
                }

                else if ((!hasOverlap && !checkPref)) {
                    possibleClasses = true;
                }
            }
        });

        if (unablePref) {
            //alert("unablePref")
    
                classItem.schedule.forEach((classInformation, index, arr) => {
                    const hasOverlap = Object.values(timetable).some((otherClass) => {
                        return otherClass.schedule.some((scheduleItem) => {
                            const overlap =
                                classInformation.day === scheduleItem.day &&
                                (
                                    (classInformation.startTime >= scheduleItem.startTime && classInformation.startTime < scheduleItem.endTime) ||
                                    (classInformation.endTime > scheduleItem.startTime && classInformation.endTime <= scheduleItem.endTime) ||
                                    (classInformation.startTime <= scheduleItem.startTime && classInformation.endTime >= scheduleItem.endTime)
                                );
        
                            return overlap;
                        });
                    });

                    if (timetable[classKey].schedule.length === 0) {
        
                        if (index + 1 === arr.length) {
        
                            if (hasOverlap) {
                                conflict = true;
                                //alert("2")
                            }
        
                            timetable[classKey].schedule.push({
                                classNo: classInformation.classNo,
                                day: classInformation.day,
                                startTime: classInformation.startTime,
                                endTime: classInformation.endTime,
                                venue: classInformation.venue,
                            });
        
                            classItem.schedule.forEach((other) => {
                                if (classInformation.classNo === other.classNo) {
        
                                    if (classInformation.day !== other.day || classInformation.startTime !== other.startTime) {
        
                                        const hasOverlap = Object.values(timetable).some((otherClass) => {
                                            return otherClass.schedule.some((scheduleItem) => {
                                                const overlap =
                                                    other.day === scheduleItem.day &&
                                                    (
                                                        (other.startTime >= scheduleItem.startTime && other.startTime < scheduleItem.endTime) ||
                                                        (other.endTime > scheduleItem.startTime && other.endTime <= scheduleItem.endTime) ||
                                                        (other.startTime <= scheduleItem.startTime && other.endTime >= scheduleItem.endTime)
                                                    );
                        
                                                return overlap;
                                            });
                                        });
        
                                        if (!hasOverlap) {
                                            timetable[classKey].schedule.push({
                                                classNo: other.classNo,
                                                day: other.day,
                                                startTime: other.startTime,
                                                endTime: other.endTime,
                                                venue: other.venue,
                                            });
                                        } else {
                                            console.log(`No suitable class found for ${classItem.lessonType}`);
                                            //alert("Conflicting other class");
                                            conflict = true;
                                            timetable[classKey].schedule.push({
                                                classNo: other.classNo,
                                                day: other.day,
                                                startTime: other.startTime,
                                                endTime: other.endTime,
                                                venue: other.venue,
                                            });
                                        }
                                    }
                                }
                            })
                        }
        
                        else if ((!hasOverlap)) {
        
                            let check = false;
        
                            classItem.schedule.forEach((other) => {
                                if (classInformation.classNo === other.classNo) {
        
                                    if (classInformation.day !== other.day || classInformation.startTime !== other.startTime) {
        
                                        const hasOverlap = Object.values(timetable).some((otherClass) => {
                                            return otherClass.schedule.some((scheduleItem) => {
                                                const overlap =
                                                    other.day === scheduleItem.day &&
                                                    (
                                                        (other.startTime >= scheduleItem.startTime && other.startTime < scheduleItem.endTime) ||
                                                        (other.endTime > scheduleItem.startTime && other.endTime <= scheduleItem.endTime) ||
                                                        (other.startTime <= scheduleItem.startTime && other.endTime >= scheduleItem.endTime)
                                                    );
                        
                                                return overlap;
                                            });
                                        });
        
                                        if (!hasOverlap) {
                                            timetable[classKey].schedule.push({
                                                classNo: other.classNo,
                                                day: other.day,
                                                startTime: other.startTime,
                                                endTime: other.endTime,
                                                venue: other.venue,
                                            });
                                        } else {
                                            check = true;
                                        }
                                    }
                                }
                            })
        
                            if (!check) {
                                timetable[classKey].schedule.push({
                                    classNo: classInformation.classNo,
                                    day: classInformation.day,
                                    startTime: classInformation.startTime,
                                    endTime: classInformation.endTime,
                                    venue: classInformation.venue,
                                });
                            }
                        }
                    }
    
        
                    // if (timetable[classKey].schedule.length === 0) {
    
                    //     if (!hasOverlap|| index + 1 === arr.length) {
    
                    //         if (index + 1 === arr.length && hasOverlap) {
                    //             conflict = true
                    //         }
    
                    //         timetable[classKey].schedule.push({
                    //             classNo: classInformation.classNo,
                    //             day: classInformation.day,
                    //             startTime: classInformation.startTime,
                    //             endTime: classInformation.endTime,
                    //             venue: classInformation.venue,
                    //         });
    
                    //         classItem.schedule.forEach((other) => {
                    //             if (classInformation.classNo === other.classNo) {
    
                    //                 if (classInformation.day !== other.day || classInformation.startTime !== other.startTime) {
    
                    //                     const hasOverlap = Object.values(timetable).some((otherClass) => {
                    //                         return otherClass.schedule.some((scheduleItem) => {
                    //                             const overlap =
                    //                                 other.day === scheduleItem.day &&
                    //                                 (
                    //                                     (other.startTime >= scheduleItem.startTime && other.startTime < scheduleItem.endTime) ||
                    //                                     (other.endTime > scheduleItem.startTime && other.endTime <= scheduleItem.endTime) ||
                    //                                     (other.startTime <= scheduleItem.startTime && other.endTime >= scheduleItem.endTime)
                    //                                 );
                                                    
                    //                             return overlap;
                    //                         });
                    //                     });
    
                    //                     if (!hasOverlap) {
                    //                         timetable[classKey].schedule.push({
                    //                             classNo: other.classNo,
                    //                             day: other.day,
                    //                             startTime: other.startTime,
                    //                             endTime: other.endTime,
                    //                             venue: other.venue,
                    //                         });
                    //                     } else {
                    //                         console.log(`No suitable class found for ${classItem.lessonType}`);
                    //                         alert("Conflicting classes");
                    //                         timetable[classKey].schedule.push({
                    //                             classNo: other.classNo,
                    //                             day: other.day,
                    //                             startTime: other.startTime,
                    //                             endTime: other.endTime,
                    //                             venue: other.venue,
                    //                         });
                    //                     }
                    //                 }
                    //             }
                    //         })
                    //     }
                    // }
                });
        }    
    });

    // if (unablePref) {

    //     sortedClasses.forEach((classItem) => {

    //         classItem.schedule.forEach((classInformation, index, arr) => {
    //             const hasOverlap = Object.values(timetable).some((otherClass) => {
    //                 return otherClass.schedule.some((scheduleItem) => {
    //                     const overlap =
    //                         classInformation.day === scheduleItem.day &&
    //                         (
    //                             (classInformation.startTime >= scheduleItem.startTime && classInformation.startTime < scheduleItem.endTime) ||
    //                             (classInformation.endTime > scheduleItem.startTime && classInformation.endTime <= scheduleItem.endTime) ||
    //                             (classInformation.startTime <= scheduleItem.startTime && classInformation.endTime >= scheduleItem.endTime)
    //                         );
    
    //                     return overlap;
    //                 });
    //             });

    
    //             if (timetable[classKey].schedule.length === 0) {

    //                 if (!hasOverlap|| index + 1 === arr.length) {

    //                     if (index + 1 === arr.length && hasOverlap) {
    //                         conflict = true
    //                     }

    //                     timetable[classKey].schedule.push({
    //                         classNo: classInformation.classNo,
    //                         day: classInformation.day,
    //                         startTime: classInformation.startTime,
    //                         endTime: classInformation.endTime,
    //                         venue: classInformation.venue,
    //                     });

    //                     classItem.schedule.forEach((other) => {
    //                         if (classInformation.classNo === other.classNo) {

    //                             if (classInformation.day !== other.day || classInformation.startTime !== other.startTime) {

    //                                 const hasOverlap = Object.values(timetable).some((otherClass) => {
    //                                     return otherClass.schedule.some((scheduleItem) => {
    //                                         const overlap =
    //                                             other.day === scheduleItem.day &&
    //                                             (
    //                                                 (other.startTime >= scheduleItem.startTime && other.startTime < scheduleItem.endTime) ||
    //                                                 (other.endTime > scheduleItem.startTime && other.endTime <= scheduleItem.endTime) ||
    //                                                 (other.startTime <= scheduleItem.startTime && other.endTime >= scheduleItem.endTime)
    //                                             );
                                                
    //                                         return overlap;
    //                                     });
    //                                 });

    //                                 if (!hasOverlap) {
    //                                     timetable[classKey].schedule.push({
    //                                         classNo: other.classNo,
    //                                         day: other.day,
    //                                         startTime: other.startTime,
    //                                         endTime: other.endTime,
    //                                         venue: other.venue,
    //                                     });
    //                                 } else {
    //                                     console.log(`No suitable class found for ${classItem.lessonType}`);
    //                                     alert("Conflicting classes");
    //                                     timetable[classKey].schedule.push({
    //                                         classNo: other.classNo,
    //                                         day: other.day,
    //                                         startTime: other.startTime,
    //                                         endTime: other.endTime,
    //                                         venue: other.venue,
    //                                     });
    //                                 }
    //                             }
    //                         }
    //                     })
    //                 }
    //             }
    //         });
    //     });

    //}


    if (conflict) { 
        alert("Conflicting classes");
    }

    if (allpref) {
        alert("Unable to fulfil all advanced filter preferences")
    }


    return Object.values(timetable);
}
  
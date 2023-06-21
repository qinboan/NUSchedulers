import React from "react";
import { useState } from "react";
import MultiSelect from  'react-multiple-select-dropdown-lite'
import  'react-multiple-select-dropdown-lite/dist/index.css'
// import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

function Filter() {

    const [day, setDay] = useState('')
    const [lesson, setLesson] = useState('')
    const [start, setStart] = useState('')
    const [end, setEnd] = useState('')
    const [save, setSave] = useState(false)
    if (save) {
        return <Navigate to = "/generate" />; 
    }

    const  changeDays  =  val  => {
        setDay(val)
    }
    const  changeLesson  =  val  => {
        setLesson(val)
    }
    const  changeStart  =  val  => {
        setStart(val)
    }
    const  changeEnd  =  val  => {
        setEnd(val)
    }

    const  days  = [
        { label:  'Monday', value:  'monday'  },
        { label:  'Tuesday', value:  'tuesday'  },
        { label:  'Wednesday', value:  'wednesday'  },
        { label:  'Thursday', value:  'thursday'  },
        { label:  'Friday', value:  'friday'  },
    ]
    const  lessons  = [
        { label:  'Monday', value:  'monday'  },
        { label:  'Tuesday', value:  'tuesday'  },
        { label:  'Wednesday', value:  'wednesday'  },
        { label:  'Thursday', value:  'thursday'  },
        { label:  'Friday', value:  'friday'  },
    ]
    const  startTime  = [
        { label:  'Monday', value:  'monday'  },
        { label:  'Tuesday', value:  'tuesday'  },
        { label:  'Wednesday', value:  'wednesday'  },
        { label:  'Thursday', value:  'thursday'  },
        { label:  'Friday', value:  'friday'  },
    ]
    const  endTime  = [
        { label:  'Monday', value:  'monday'  },
        { label:  'Tuesday', value:  'tuesday'  },
        { label:  'Wednesday', value:  'wednesday'  },
        { label:  'Thursday', value:  'thursday'  },
        { label:  'Friday', value:  'friday'  },
    ]


    return (
        <div>
            <div className="Filter">
                <h1>Advanced Filter</h1>
            </div>

            <div  className="Days">
                <h4>No classes on : </h4>
                {/* {value} */}
            </div>
            <div className="selectDays"> 
                <MultiSelect
                    onChange={changeDays}
                    options={days}
                />
            </div>

            <div  className="Lessons">
                <h4>Fixed classes : </h4>
                {/* {value} */}
            </div>
            <div className="selectLessons"> 
                <MultiSelect
                    onChange={changeLesson}
                    options={lessons}
                />
            </div>

            <div  className="Start">
                <h4>Start classes from : </h4>
                {/* {value} */}
            </div>
            <div className="selectStart"> 
                <MultiSelect
                    onChange={changeStart}
                    options={startTime}
                />
            </div>

            <div  className="End">
                <h4>End classes at : </h4>
                {/* {value} */}
            </div>
            <div className="selectEnd"> 
                <MultiSelect
                    onChange={changeEnd}
                    options={endTime}
                />
            </div>

            <div className="save">
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

export default Filter;
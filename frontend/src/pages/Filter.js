import React from "react";
import { useState } from "react";
import Select from 'react-select'; 
import makeAnimated from 'react-select/animated';
import { Navigate, useNavigate } from "react-router-dom";

function Filter({ setFilterOptions, account }) {    

    const [day, setDay] = useState([])
    const [start, setStart] = useState('')
    const [end, setEnd] = useState('')
    const [save, setSave] = useState(false)

    const animatedComponents = makeAnimated();
    
    if (save) {
        return <Navigate to = {`/${account}/generate`} />; 
    }

    const  changeStart  =  (selectedOption)  => {
        setStart(selectedOption.value)
    }
    const  changeEnd  =  (selectedOption)  => {
        setEnd(selectedOption.value)
    }
    const handleSelectDays = (selectedOption) => {
        const selectedDay = selectedOption;
        setDay(selectedDay);
    };

    const  days  = [
        { label:  'Monday', value:  'Monday'  },
        { label:  'Tuesday', value:  'Tuesday'  },
        { label:  'Wednesday', value:  'Wednesday'  },
        { label:  'Thursday', value:  'Thursday'  },
        { label:  'Friday', value:  'Friday'  },
    ]

    const  startTime  = [
        { label:  '0800', value:  '0800'  },
        { label:  '0900', value:  '0900'  },
        { label:  '1000', value:  '1000'  },
        { label:  '1100', value:  '1100'  },
        { label:  '1200', value:  '1200'  },
    ]
    const  endTime  = [
        { label:  '1400', value:  '1400'  },
        { label:  '1500', value:  '1500'  },
        { label:  '1600', value:  '1600'  },
        { label:  '1700', value:  '1700'  },
        { label:  '1800', value:  '1800'  },
    ]

    const handleSave = () => {
        const selectedDays = day.map((selectedDay) => selectedDay.value);

        const options = {
            day: selectedDays,
            start,
            end,
        };

        setFilterOptions(options);
        setSave(true);
    };


    return (
        <div>
            <div className="Filter">
                <h1>Advanced Filter</h1>
            </div>

            <div  className="Days">
                <h4>No classes on : </h4>
            </div>
            <div className="selectDays"> 
                <Select
                    isMulti
                    components={animatedComponents}
                    onChange={handleSelectDays}
                    options={days}
                    className="days"
                    classNamePrefix="days"
                />
            </div>


                <div  className="Start">
                    <h4>Start classes from : </h4>
                </div>
                <div className="selectStart"> 
                    <Select
                        onChange={changeStart}
                        options={startTime}
                    />
                </div>

                <div  className="End">
                    <h4>End classes at : </h4>
                </div>
                <div className="selectEnd"> 
                    <Select
                        onChange={changeEnd}
                        options={endTime}
                    />
                </div>

            <div className="save">
                <button onClick={handleSave}>Save</button>
            </div>
        </div>
    )
}

export default Filter;
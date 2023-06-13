import React from "react";
import { useState } from "react";
// import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import MultiSelect from  'react-multiple-select-dropdown-lite'
import  'react-multiple-select-dropdown-lite/dist/index.css'


function Generate() {

    const [value, setvalue] = useState('')

    const  handleOnchange  =  val  => {
        setvalue(val)
    }

    const  options  = [
        { label:  'Option 1', value:  'option_1'  },
        { label:  'Option 2', value:  'option_2'  },
        { label:  'Option 3', value:  'option_3'  },
        { label:  'Option 4', value:  'option_4'  },
    ]

    const [first, setFirst] = useState(false);
    const changeFirst = !first;

    const [second, setSecond] = useState(false);
    const changeSecond = !second;

    const [advanced, setAdvanced] = useState(false);
    const [generate, setGenerate] = useState(false);

   
    if (advanced) {
        return <Navigate to = "/filter" />; 
    }

    if (generate) {
        return <Navigate to = "/home" />; 
    }

    return (
        <div>
            <div className="Generate">
                <h1>Generate Timetable</h1>
            </div>

            <div  className="Modules">
                <h4>Modules : </h4>
                {/* {value} */}
            </div>


            <div className="select"> 
                <MultiSelect
                    onChange={handleOnchange}
                    options={options}
                />

            </div>

            <div className="first">
                <input type = "checkbox" checked = {first} onClick={() => setFirst(changeFirst)}/>
                <label>Spread my classes in the available dates</label>
            </div>

            <div className="second">
                <input type = "checkbox" checked = {second} onClick={() => setSecond(changeSecond)}/>
                <label>Put all my classes together so that I need to make the least number of trips to school :)</label>
            </div>

            <div className="advanced">
                <button onClick={() => {
                    setAdvanced(true);
                }}
                >
                    {" "}
                    Advanced Filter
                </button>
            </div>

            <div className="generate">
                <button onClick={() => {
                    setGenerate(true);
                }}
                >
                    {" "}
                    Generate!
                </button>
            </div>

        
        </div>
            
    )
}

export default Generate;
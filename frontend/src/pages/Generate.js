import { Navigate } from "react-router-dom";
import Select from 'react-select'; 
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { generateTimetableData } from './TimetableUtils';
import Home from "./Home";


function Generate() {

    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [addedModules, setAddedModules] = useState([]);
    const [timetableData, setTimetableData] = useState([]);
    const [showTimetable, setShowTimetable] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await axios.get('https://api.nusmods.com/v2/2023-2024/moduleList.json');
            setData(response.data); // Store the fetched data in the state
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchData();
    }, []);

    useEffect(() => {
        const results = data.filter((item) =>
          item.moduleCode.toLowerCase().startsWith(searchTerm.toLowerCase())
        );
        setSearchResults(results);
    }, [data, searchTerm]);
    
    const handleSearch = (inputValue) => {
        setSearchTerm(inputValue);
    };

    const handleSelect = (selectedOption) => {
        const selectedModuleCode = selectedOption.value;
        const moduleExists = addedModules.some(
            (module) => module.moduleCode === selectedModuleCode
        );
        if (!moduleExists) {
            const selectedModule = searchResults.find(
                (module) => module.moduleCode === selectedModuleCode
            );
            setAddedModules([...addedModules, selectedModule]);
        }
    };

    const handleRemove = (moduleCode) => {
        const updatedModules = addedModules.filter(
            (module) => module.moduleCode !== moduleCode
        );
        setAddedModules(updatedModules);
    };
    const dropdownOptions = searchResults.map((item) => ({
        value: item.moduleCode,
        label: item.moduleCode,
    }));
    
    const handleGenerate = async () => {
        // Extract the module codes from the addedModules array
        const moduleCodes = addedModules.map((module) => module.moduleCode);

        const apiRequests = [];
        //alert(moduleCodes);
    
        try {
            moduleCodes.forEach((moduleCode) => {
                const apiUrl = `https://api.nusmods.com/v2/2023-2024/modules/${moduleCode}.json`;
                const apiRequest = axios.get(apiUrl);
                apiRequests.push(apiRequest);
            });

            const responses = await Promise.all(apiRequests);

            const timeTableDataArray = responses.map((response) => response.data);
            

        //   const response = await axios.get('https://api.nusmods.com/v2/2022-2023/modules/CS1010S.json', {
        //     params: {
        //       modules: moduleCodes.join(','), // Convert module codes to a comma-separated string
        //     },
        //   });
          //setGenerate(true);
            const generatedTimetableData = generateTimetableData(timeTableDataArray);
            setTimetableData(generatedTimetableData);
            //setTimetableData(timeTableDataArray);
            setShowTimetable(true);

          
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    };

    const [first, setFirst] = useState(false);
    const changeFirst = !first;

    const [second, setSecond] = useState(false);
    const changeSecond = !second;

    const [advanced, setAdvanced] = useState(false);

   
    if (advanced) {
        return <Navigate to = "/filter" />; 
    }

    if (showTimetable) {
        return <Home timetableData = {timetableData} showTimetable={showTimetable}/>
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
                <Select
                    options={dropdownOptions}
                    isSearchable
                    placeholder="Search by module code"
                    onChange={handleSelect}
                    onInputChange={handleSearch}
                    className="search-bar"
                    classNamePrefix="search-bar"
                />
            </div>

            <div className="selected-modules">
                <h4>Selected Modules:</h4>
                <ul>
                    {addedModules.map((module) => (
                        <li key={module.moduleCode}>
                            {module.moduleCode}
                            <button onClick={() => handleRemove(module.moduleCode)}>
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
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
                <button onClick={handleGenerate}>
                    Generate!
                </button>
            </div>

            {/* {showTimetable && (
                <div className="timetabledata">
                    <h4>TimeTable Data: </h4>
                    <pre>{JSON.stringify(timetableData, null, 2)}</pre>
                </div>
            )} */}
            {/* Render the timetable component if there is timetableData */}
            {/* {showTimetable ? <Timetable timetableData={timetableData} /> : null} */}
            
        </div>
    )
}

export default Generate;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';  

function Modules() {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [addedModules, setAddedModules] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await axios.get('https://api.nusmods.com/v2/2022-2023/moduleList.json');
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

    return (
        <div>
            <Select
                options={dropdownOptions}
                isSearchable
                placeholder="Search by module code"
                onChange={handleSelect}
                onInputChange={handleSearch}
            />
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
    );
};
export default Modules;

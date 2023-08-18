import React, { useState } from 'react';
import Axios from 'axios'
import { getAuthToken } from "../Frontend/AuthTokenExport.js";

export default function SearchTab() {
    const [selectedOption, setSelectedOption] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = async(event) => {
        event.preventDefault();
        const authToken = getAuthToken();
        try {
            const response = await Axios.get('/searchprofiles', {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
                params: {
                    selectedOption: selectedOption,
                    searchQuery: searchQuery // Pass the search query as a parameter
                }
            });
            
            // Handle the response data, e.g., update state with search results
            console.log('Came back from server side');
            
        } 
        catch (error) {
            console.log('Error searching profiles:', error);
        }
    };

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value); // Update the selected option state
    };

    return (
        <div>
            <select id="employeeName" value={selectedOption} onChange={handleOptionChange}>
                <option value="">username</option>
                <option value="">fullname</option>
                <option value="">school</option>
                <option value="">college</option>
                <option value="">university</option>
                <option value="">workplace</option>
            </select>
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
}
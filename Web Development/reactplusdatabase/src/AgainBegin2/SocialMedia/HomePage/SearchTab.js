import React, { useState } from 'react';
import Axios from 'axios';
import { getAuthToken } from "../Frontend/AuthTokenExport.js";

export default function SearchTab() {
    const [selectedOption, setSelectedOption] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = async (event) => {
        event.preventDefault();
        const authToken = getAuthToken();
        try {
            const response = await Axios.get('/searchprofiles', {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
                params: {
                    selectedOption: selectedOption,
                    searchQuery: searchQuery, // Pass the search query as a parameter
                },
            });

            const responseData = response.data;
            const resultsContainer = document.getElementById('resultsContainer'); 
            resultsContainer.innerHTML = '';
            responseData.forEach((profile) => {
                const profileElement = document.createElement('div');
                const htmlContent = `<div>
                        <p>Name: ${profile.fullname}</p>
                        <p>School: ${profile.school}</p>
                        <p>College: ${profile.college}</p>
                        <p>University: ${profile.university}</p>                        
                    </div>`;
    
                profileElement.innerHTML = htmlContent;
                resultsContainer.appendChild(profileElement);
            });
            console.log('Came back from server side in /searchprofiles');
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
                <option value="username">username</option>
                <option value="fullname">fullname</option>
                <option value="school">school</option>
                <option value="college">college</option>
                <option value="university">university</option>
                <option value="workplace">workplace</option>
            </select>
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
            />
            <button onClick={handleSearch}>Search</button>
            <div id="resultsContainer"></div> {/* This is where the search results will be displayed */}
        </div>
    );
}
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
            const usersArray = responseData.users;
            usersArray.forEach((profile) => { // profile is a single object
                const profileElement = document.createElement('div');
                const htmlContent = `<div>
                        <p>Name: ${profile.fullname}</p>
                        <p>School: ${profile.school}</p>
                        <p>College: ${profile.college}</p>
                        <p>University: ${profile.university}</p>                        
                    </div>
                    <button class="editButton">Friend Request</button>`;
                profileElement.innerHTML = htmlContent;
                resultsContainer.appendChild(profileElement);

                const button = profileElement.querySelector('.editButton');
                button.addEventListener('click', () => {handleFriendRequest(profile.email, responseData.sender)})
            });
            console.log('Came back from server side in /searchprofiles');
        } 
        catch (error) {
            console.log('Error searching profiles:', error);
        }
    };

    const handleFriendRequest = async(profile) => {
        const authToken = getAuthToken();
        console.log('This is the client side of friendrequest and i am entering try catch block', profile)
        try {
            const response = await Axios.post('/friendrequest', profile, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authToken}`,
                },
            });
            console.log('Sending request to the server side from friendrequest is success and the response came back')
        } 
        catch (error) {
            console.log('Error sending friend request:', error);
        }
    }

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
            <div id="resultsContainer"></div> 
        </div>
    );
}
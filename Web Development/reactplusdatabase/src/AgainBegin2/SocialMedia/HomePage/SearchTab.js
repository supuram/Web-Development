import React, { useState } from 'react';
import Axios from 'axios';
import { getAuthToken } from "../Frontend/AuthTokenExport.js";
import NotificationDashboard from './NotificationDashboard.js'

let receiver;

export default function SearchTab() {
    const [selectedOption, setSelectedOption] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [notificationData, setNotificationData] = useState(null);
    const [usersArray, setUsersArray] = useState([]);
    const [responseData, setResponsedata] = useState('')

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
            setResponsedata(response.data)
            const resultsContainer = document.getElementById('resultsContainer');
            resultsContainer.innerHTML = '';
            // Access the array of users
            setUsersArray(response.data.users);
            console.log('Came back from server side in /searchprofiles');
        } 
        catch (error) {
            console.log('Error searching profiles:', error);
        }
    };

    const handleFriendRequest = async(receiver, sender) => {
        const authToken = getAuthToken();
        console.log('This is the client side of friendrequest and i am entering try catch block')
        try {
            await Axios.post('/friendrequest', {
                receiver: receiver,
                sender: sender
            }, 
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authToken}`,
                },
            });
            console.log('Sending request to the server side from friendrequest is success and the response came back', receiver, sender)
            setNotificationData({ receiver, sender });
        } 
        catch (error) {
            console.log('Error sending friend request:', error);
        }
    }

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value); // Update the selected option state
    };

    //const currentUserProfile = a;

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
            <div id="resultsContainer">
                {usersArray ? (usersArray.map((receiver) => (
                    <div key={receiver.email}>
                        <p>Name: {receiver.fullname}</p>
                        <p>School: {receiver.school}</p>
                        <p>College: {receiver.college}</p>
                        <p>University: {receiver.university}</p>
                        <button
                            className="editButton"
                            onClick={() => handleFriendRequest(receiver.email, responseData.sender)}
                        >
                            Friend Request
                        </button>
                    </div>
                ))) : (
                    <p>Loading user profiles...</p>
                )}
            </div> 
            
                <NotificationDashboard receiver={notificationData.receiver} sender={notificationData.sender} />
            
        </div>
    );
}
export { receiver }
import React, { useState, useEffect, useRef } from 'react';
import Axios from 'axios';
import { getAuthToken } from "./../Frontend/AuthTokenExport.js";
import './SearchTab.css'
import MessageDashBoard from './MessageDashBoard.js'

export default function SearchTab() {
    const [selectedOption, setSelectedOption] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [usersArray, setUsersArray] = useState([]);
    const [senderEmail, setSenderEmail] = useState('')

    const [isVisible, setIsVisible] = useState(false);
    const subMenuRef = useRef();

    useEffect(() => {
        const handleOutsideClick = (event) => {
        if (subMenuRef.current && !subMenuRef.current.contains(event.target)) {
            setIsVisible(false);
        }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
        document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    const toggleVisibility = () => {
        setIsVisible(prevState => !prevState.isVisible);
        <MessageDashBoard ref={subMenuRef} style={{display:'block'}}/>
    };

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
                    searchQuery: searchQuery, 
                },
            });
            console.log('came back from searchprofiles. This is the client side')
            const responseData = response.data;
            setUsersArray(responseData.users);
            setSenderEmail(responseData.senderEmail)
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
            <div id="resultsContainer">
                {usersArray.map((receiver) => {
                    const imageBase64 = receiver.image;
                    const imageContentType = receiver.contentType; 
                    const uploadedImage = `data:${imageContentType};base64,${imageBase64}`;

                    return (
                        <div key={receiver._id}>
                            <p>Name: {receiver.fullname}</p>
                            <img src={uploadedImage} alt="Uploaded" style={{width: '4rem', height: '3rem'}} />
                            <div className={`divMessageProfile ${isVisible ? 'visible' : ''}`}>
                                <button className="buttonMessageProfile" onClick={toggleVisibility}>Send a Message</button>
                                {isVisible && (
                                    <MessageDashBoard ref={subMenuRef} style={{display:'block'}}/>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div> 
        </div>
    );
}
import React, { useState, useEffect } from 'react';
import { getAuthToken } from "../Frontend/AuthTokenExport.js";
import Axios from 'axios';

export default function ProfileForm() {
    const [name, setName] = useState('');
    const [dob, setDob] = useState('');
    const [school, setSchool] = useState('');
    const [college, setCollege] = useState('');
    const [uni, setUni] = useState('');
    const [workplace, setWorkplace] = useState('');
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        // Fetch user's profile data and populate form fields
        const fetchProfileData = async () => {
            const authToken = getAuthToken();
            try {
                const response = await Axios.get('/userProfileData', {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                });
                const profileData = response.data;
                setName(profileData.fullname || '');
                setDob(profileData.dob || '');
                setSchool(profileData.school || '');
                setCollege(profileData.college || '');
                setUni(profileData.university || '');
                setWorkplace(profileData.workplace || '');
            } 
            catch (error) {
                console.log('Error fetching profile data:', error);
            }
        };

        fetchProfileData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const authToken = getAuthToken();
        try {
            const formData = {
                name: name,
                dob: dob,
                school: school,
                college: college,
                uni: uni,
                workplace: workplace
            };
            
            if (isEditMode) {
                // Update existing profile data
                const response = await Axios.put('/updateProfile', formData, {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                });
                console.log('Response received by the frontend from the backend in updateProfile = ', response.data)
            } else {
                // Create new profile data
                await Axios.post('/createProfile', formData);
            }

            console.log('Profile data submitted/updated successfully');
            setIsEditMode(false); // Exit edit mode
        } 
        catch (error) {
            console.log('Error submitting/updating profile data:', error);
        }
    }

    return (
        <div>
            <div>
                {isEditMode ? (
                    <div>
                        <label>Full Name</label>
                        <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
                        <label>Date of Birth</label>
                        <input type='date' value={dob} onChange={(e) => setDob(e.target.value)} />
                        <label>School</label>
                        <input type='text' value={school} onChange={(e) => setSchool(e.target.value)} />
                        <label>College</label>
                        <input type='text' value={college} onChange={(e) => setCollege(e.target.value)} />
                        <label>University</label>
                        <input type='text' value={uni} onChange={(e) => setUni(e.target.value)} />
                        <label>Your place of work</label>
                        <input type='text' value={workplace} onChange={(e) => setWorkplace(e.target.value)} />
                        <button onClick={handleSubmit}>Save Changes</button>
                    </div>
                ) : (
                    <div>
                        <p>Name: {name}</p>
                        <p>Date of Birth: {dob}</p>
                        <p>School: {school}</p>
                        <p>College: {college}</p>
                        <p>University: {uni}</p>
                        <p>Workplace: {workplace}</p>
                        <button onClick={() => setIsEditMode(true)}>Edit</button>
                    </div>
                )}
            </div>
        </div>
    );
}
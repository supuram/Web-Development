/**
*! A bug has arose in the code. when a user logs in and uploads, say image a.jpg it returns an error on the client and server side. On server side it shows req.file = undefined. But as soon as the user again uploads another image b.jpg, the code now shows the image a.jpg which the user previously tried to upload. Next when the user tries to upload c.jpg, the b.jpg image gets uploaded instead now. 

import React, { useState } from "react";
import axios from 'axios';

export default function UploadImages() {
    const [selectedFile, setSelectedFile] = useState();
    const [uploadedImageUrls, setUploadedImageUrls] = useState([]);

    const handleUpload = async (event) => {
        event.preventDefault();
        setSelectedFile(event.target.files[0]);
        const formData = new FormData();
        formData.append('image', selectedFile);
        console.log('entered handleUpload in UploadImages.js')
        // Replace this with the URL of your upload API
        const uploadAPIUrl = "http://localhost:5000/upload-file-to-cloud-storage";
        try{
            const response = await axios.post(uploadAPIUrl, formData);
            console.log('Came back on the client side from server side upload-file-to-cloud-storage = ')
            setUploadedImageUrls(prevState => [...prevState, response.data.publicUrl]);
        }
        catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <input type="file" name="image" onChange={handleUpload} />
            {uploadedImageUrls.map((url, index) => (
                <img key={index} src={url} alt="Uploaded" style={{width:'4rem', height:'3rem', borderRadius:'100%'}} />
            ))}
        </div>
    );
}

*? The issue you’re experiencing seems to be due to the asynchronous nature of JavaScript. When you select a file, setSelectedFile(event.target.files[0]) is called, which updates the state. However, state updates in React may be asynchronous, and selectedFile may not reflect the new value immediately after it’s set.

*? In your handleUpload function, you’re creating a FormData object and appending selectedFile to it right after calling setSelectedFile. At this point, selectedFile may still hold the old value because the state update hasn’t been completed yet.

*? To fix this issue, you can create the FormData object and make the axios post request inside a useEffect hook that has selectedFile as a dependency. This ensures that the axios post request is made after selectedFile has been updated. Here’s how you can do it - 
*/

import React, { useState, useEffect } from "react";
import axios from 'axios';
import { getAuthToken } from "../Frontend/AuthTokenExport.js";

export default function UploadImages() {
    const [selectedFile, setSelectedFile] = useState();
    const [uploadedImageUrls, setUploadedImageUrls] = useState([]);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    useEffect(() => {
        const uploadImage = async () => {
            if (!selectedFile) return;
            const formData = new FormData();
            formData.append('image', selectedFile);
            console.log('entered handleUpload in UploadImages.js')
            // Replace this with the URL of your upload API
            const uploadAPIUrl = "http://localhost:5000/upload-file-to-cloud-storage";
            const authToken = getAuthToken();
            try{
                const response = await axios.post(uploadAPIUrl, formData, {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                });
                console.log('Came back on the client side from server side upload-file-to-cloud-storage = ')
                setUploadedImageUrls(prevState => [...prevState, response.data.publicUrl]);
            }
            catch (error) {
                console.log(error);
            }
        };
        uploadImage();
    }, [selectedFile]);

    return (
        <div>
            <input type="file" name="image" onChange={handleFileChange} />
            {uploadedImageUrls.map((url, index) => (
                <img key={index} src={url} alt="Uploaded" style={{width:'4rem', height:'3rem', borderRadius:'100%'}} />
            ))}
        </div>
    );
}
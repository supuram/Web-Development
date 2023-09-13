import React, { useState, useEffect } from "react";
import { getAuthToken } from "../Frontend/AuthTokenExport.js";
import Axios from 'axios'

export default function ProfileImage() {
    const [uploadedImage, setUploadedImage] = useState(null);

    const handleImageUpload = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("image", event.target.files[0]);
        console.log('appended formData')
        const authToken = getAuthToken();

        try {
            const response = await Axios.post('/upload', formData, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            console.log('Response received by the frontend from the backend = ', response.data)
            // Fetch and update the user's image
            await fetchUserImage();
        } 
        catch (error) {
            console.log(error);
        }
    };

    const fetchUserImage = async () => {
        const authToken = getAuthToken();
        console.log('enter fetchUserImage')
        try {
            const response = await Axios.get('/user/image', {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
                responseType: 'arraybuffer', // Important: Ensure binary response
            });
            console.log('came back from server /user/image')
            const imageBase64 = btoa(new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), ''));
            const imageContentType = response.headers['content-type'];
            setUploadedImage(`data:${imageContentType};base64,${imageBase64}`);
        } 
        catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchUserImage();
    }, []);

    return (
        <div>
            <form>
                <input type="file" name="image" id="image" onChange={handleImageUpload} />
            </form>
            {uploadedImage && <img src={uploadedImage} alt="Uploaded" style={{width:'4rem', height:'3rem', borderRadius:'100%'}}/>}
        </div>
    );
}
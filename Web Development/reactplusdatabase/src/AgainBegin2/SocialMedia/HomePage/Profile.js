import React, { useState } from "react";
import { getAuthToken } from "../Frontend/AuthTokenExport.js";
import Axios from 'axios'

export default function Profile() {
    const [uploadedImage, setUploadedImage] = useState(null);

    const handleImageUpload = async (event) => {
        event.preventDefault();
        console.log('Profile entry in FormData()')
        const formData = new FormData();
        formData.append("image", event.target.files[0]);
        const authToken = getAuthToken()
        console.log('Profile exit in FormData()')
        await Axios.post('/upload', formData, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        })
        .then(response => {
            console.log('Inside is response is ok')
            const imageUrl = response.data;
            setUploadedImage(imageUrl);
        })
        .catch(err => console.log(err))
        console.log('Profile exit in response Axios')        
    };

    return (
        <div>
            <form>
                <input type="file" name="image" id="image" onChange={handleImageUpload} />
            </form>
            {uploadedImage && <img src={uploadedImage} alt="Uploaded" />}
        </div>
    );
}
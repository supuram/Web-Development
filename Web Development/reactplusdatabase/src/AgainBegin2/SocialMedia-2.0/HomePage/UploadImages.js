import React, { useState } from "react";
import axios from 'axios';

export default function UploadImages() {
    const [selectedFile, setSelectedFile] = useState();
    const [uploadedImageUrl, setUploadedImageUrl] = useState();

    const handleUpload = async (event) => {
        event.preventDefault();
        setSelectedFile(event.target.files[0]);
        const formData = new FormData();
        formData.append('image', selectedFile);
        console.log('entered handleUpload in UploadImages.js')
        // Replace this with the URL of your upload API
        const uploadAPIUrl = "http://localhost:5000/upload-file-to-cloud-storage";
        const response = await axios.post(uploadAPIUrl, formData);
        console.log('Came back on the client side from server side upload-file-to-cloud-storage ')
        setUploadedImageUrl(response.data.publicUrl);
    };

    return (
        <div>
            <input type="file" name="image" onChange={handleUpload} />
            <img src={ uploadedImageUrl } alt="Uploaded" style={{width:'4rem', height:'3rem', borderRadius:'100%'}} />
        </div>
    );
}
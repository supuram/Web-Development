import React, { useState } from "react";

export default function Profile() {
    const [uploadedImage, setUploadedImage] = useState(null);

    const handleImageUpload = async (event) => {
        event.preventDefault();
        console.log('Profile entry in FormData()')
        const formData = new FormData();
        formData.append("image", event.target.files[0]);
        console.log('Profile exit in FormData()')
        const response = await fetch("/upload", {
            method: "POST",
            body: formData,
        });
        console.log('Profile exit in response fetch')
        if (response.ok) {
            console.log('Inside is response is ok')
            const imageUrl = await response.text();
            setUploadedImage(imageUrl);
        }
        console.log('Response is OK')
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
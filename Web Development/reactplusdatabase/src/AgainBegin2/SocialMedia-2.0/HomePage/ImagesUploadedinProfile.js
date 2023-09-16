import React, { useEffect, useState } from "react";
import Axios from 'axios'
import { getAuthToken } from "../Frontend/AuthTokenExport.js";

export default function ImagesUploadedinProfile(){
    const [uploadedImageUrls, setUploadedImageUrls] = useState([]);
    useEffect(() => {
        const fetchImages = async () => {
            const authToken = getAuthToken();
            try{
                const response = await Axios.get('/fetch-uploaded-image', {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                });
                console.log('Came back on the client side from server side fetch-uploaded-image = ')
                if (response.status === 200) {
                    const images = response.data;
                    setUploadedImageUrls(Object.values(images));
                } 
                else {
                    console.log('error')
                }
            }
            catch (error) {
                console.log(error);
            }
        };
        fetchImages();
    }, []);

    return(
        <div>
            {uploadedImageUrls.map((url, index) => (
                <img key={index} src={url} alt="Uploaded" style={{width:'4rem', height:'3rem', borderRadius:'100%'}} />
            ))}
        </div>
    )
}
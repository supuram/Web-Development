import React, { useState, useEffect } from "react";
import { getAuthToken } from "../Frontend/AuthTokenExport.js";
import Axios from 'axios'

export default function Profile() {
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

/*import React, { useState, useEffect } from "react";
import { getAuthToken } from "../Frontend/AuthTokenExport.js";
import Axios from 'axios'

export default function Profile(){
    const [image, setImage] = useState('')
    function convertToBase64(e){
        console.log(e)
        var reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        reader.onload = () => {
            console.log(reader.result)
            setImage(reader.result)
        }
        reader.onerror = error => {
            console.log('Error = ', error)
        }
    }
    return(
        <div className="auth-wrapper">
            <div className="auth-inner" style={{width:'auto'}}>Lets Upload
                <input accept="image/*" type="file" onChange={convertToBase64}></input>
                {image == '' || image == null ? '' : <img width={100} height={100} src={image}></img>}
            </div>
        </div>
    )
}*/

/**
*! Q)const imageBlob = new Blob([response.data], { type: response.headers['content-type'] }); What is the meaning of this ?
Ans)This line of code is creating a JavaScript `Blob` object using the binary data received in the response from an HTTP request. Let's break down what each part of the code does:

1. `new Blob([response.data], { type: response.headers['content-type'] })`: This code creates a new `Blob` object.

   - `new Blob([response.data])`: The `Blob` constructor takes an array of data as its first argument. In this case, you're passing `[response.data]`, which is an array containing the binary data received in the response.

   - `{ type: response.headers['content-type'] }`: The second argument of the `Blob` constructor is an options object. Here, you're setting the `type` property of the options object to the value of the `Content-Type` header from the response. This specifies the MIME type of the data in the blob.

*? A `Blob` (Binary Large Object) is a data structure that represents a sequence of binary data. It is commonly used for handling binary data, such as images, audio, or video files, in JavaScript. Blobs can be used to store, manipulate, and transmit binary data within web applications.                                                     In the context of your code, this `Blob` object represents the binary image data that you received from the server in response to your image upload request. By specifying the correct MIME type using the `type` property, you're providing additional information about the nature of the binary data. This information is important when working with the data, as it helps browsers and other clients understand how to interpret and use the binary data correctly.After creating the `Blob` object, you can use it to display the image on the frontend. You typically use this `Blob` object to create a data URL, which can be used as the source (`src`) for an `<img>` element in your HTML. This allows you to display the binary data as an image on your web page.

*! Q)What does this line do - const imageUrl = URL.createObjectURL(imageBlob);
Ans)The line `const imageUrl = URL.createObjectURL(imageBlob);` in your frontend code is creating a unique URL (Uniform Resource Locator) that represents the binary image data stored in a `Blob` object. This URL can be used as the source (`src`) for an `<img>` element in your HTML to display the image on a web page.

Here's what this line does:

1. `URL.createObjectURL(imageBlob)`: This is a method provided by the `URL` API in modern browsers. It takes a `Blob` object (`imageBlob` in your case) as its argument and returns a unique URL that represents the `Blob` data. The returned URL is a temporary object URL that refers directly to the `Blob`'s data in memory.

2. `const imageUrl = ...`: You're storing the created object URL in the `imageUrl` variable.

After creating the object URL, you can use it to display the image on your web page by setting it as the `src` attribute of an `<img>` element:

```jsx
<img src={imageUrl} alt="Uploaded" />
```

This allows you to visually display the image data from the `Blob` on your web page. Keep in mind that object URLs are temporary and are automatically revoked when the page is closed or when you explicitly call `URL.revokeObjectURL(url)` to release the resources associated with the URL. This helps prevent memory leaks.

In summary, the line `const imageUrl = URL.createObjectURL(imageBlob);` enables you to efficiently display binary image data as an image on your web page using an `<img>` element.
*/

/*const fetchUserImage = async () => {
        const authToken = getAuthToken();

        try {
            const response = await Axios.get('/upload', {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
                responseType: 'arraybuffer', // Important: Ensure binary response
            });

            // Convert the image data to a Base64 string
            const imageBase64 = btoa(new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), ''));
            setUploadedImage(`data:image/jpeg;base64,${imageBase64}`);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchUserImage();
    }, []);*/
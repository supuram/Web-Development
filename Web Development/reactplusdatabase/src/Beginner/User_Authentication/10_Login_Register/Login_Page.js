import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Axios from "axios";
import Register_Button from "./Register_Button";

export default function Login_Page(){
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault()
        Axios.post('/Login-Page-Form', {email, password})
        .then(response => {
            if(response.data.token){
                document.cookie = `authToken = ${response.data.token}; path=/` /* The path attribute 
specifies the URL path for which the cookie should be sent, not the URL to which the user should be 
redirected */
                /** Store user data in Local Storage  */
                localStorage.setItem('userEmail', email);
                localStorage.setItem('userToken', response.data.token);
                navigate('/LoggedInHomePage')
            }
        })
        .catch(err => console.log(err))

        Axios.get('/protected-route', {
            headers: {
                Authorization: `Bearer ${getCookie('authToken')}`
            }
        })
   }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    type="email" 
                    value={email}
                    placeholder="Email"
                    onChange={event => {
                        setEmail(event.target.value)
                    }}>
                </input>
                <input 
                    type="password" 
                    value={password}
                    placeholder="Password"
                    onChange={event => {
                        setPassword(event.target.value)
                    }}>
                </input>
                <button>Submit</button>
                <Register_Button />
            </form>
        </div>
    )
}

/**
*! Q)const value = `; ${document.cookie}`; - What does this line do ?
Ans)The line `const value = `; ${document.cookie}`;` is used to retrieve the value of the `document.cookie` 
property, which contains all the cookies associated with the current document.

In JavaScript, `document.cookie` returns a semicolon-separated string that includes all the cookies in the format 
`"name=value; name2=value2; ..."`. By appending a semicolon and a space before `document.cookie`, the code prepares 
the string to be split into individual cookie values.

The resulting `value` variable will hold the string that represents all the cookies associated with the current 
document, making it easier to parse and work with the individual cookies.

*! Q)What does cookies actually do ?
Ans)Cookies are small pieces of data that websites store on a user's computer or device. They are commonly used to 
store information about the user's preferences, login status, and browsing activity.

The main purposes of cookies are:

1. Session Management: Cookies are often used to manage user sessions. When a user logs into a website, a session 
cookie is created to keep track of their login status. This allows the user to navigate different pages of the 
website without needing to authenticate on each page.

2. Personalization: Cookies can be used to remember user preferences and personalize the website experience. For 
example, a website may remember the user's language preference or display customized content based on their previous
interactions.

3. Tracking and Analytics: Cookies can be used to track user behavior and gather analytics data. This helps website 
owners understand how users interact with their site, which pages are visited, and what actions are taken. This 
data can be used to optimize the website and improve the user experience.

4. Advertising: Cookies are widely used for targeted advertising. Ad networks and advertisers use cookies to track 
user interests and display relevant ads based on their browsing history and preferences.

It's important to note that cookies can contain sensitive information, and there are privacy concerns associated 
with their use. As a result, there are regulations and guidelines in place, such as the General Data Protection 
Regulation (GDPR), to ensure proper handling and consent for the use of cookies.

*! Q)What does this line do - const parts = value.split(`; ${name}=`);
Ans)The line `const parts = value.split(`; ${name}=`);` is splitting the `value` string into an array of substrings 
based on the provided delimiter, which in this case is `; {name}=`. 

Let's break down the line:

- `value` is the string that contains the entire cookie. It typically has a format like "cookie1=value1; cookie2=
value2; cookie3=value3".

- `name` is the name of the specific cookie that we want to extract the value for.

- `; ${name}=` is the delimiter used to split the `value` string. It represents the semicolon followed by the 
cookie name and equals sign.

The `split()` method is a JavaScript string method that splits a string into an array of substrings based on a 
specified delimiter. In this case, it will split the `value` string into an array of substrings wherever it finds 
the delimiter `; {name}=`. 

After splitting, the `parts` array will contain two elements: the substring before the `; {name}=` delimiter and 
the substring after the delimiter. The second element of the array will be the desired value of the cookie.

For example, if `value` is "cookie1=value1; cookie2=value2; cookie3=value3" and `name` is "cookie2", the resulting 
`parts` array will be `[" cookie1=value1; ", " value2; cookie3=value3"]`. The value.split(; ${name}=) statement 
splits the value string at the occurrence of ; ${name}=. In this case, it splits the string at "; cookie2=". The 
resulting array elements contain the parts before and after the split point. 
"cookie1=value1; ": This is the part before the split point.
"value2; cookie3=value3": This is the part after the split point.
The parts array retains all the elements from the original string, and cookie2 is not eliminated.

*! Q)if (parts.length === 2) return parts.pop().split(';').shift(); What does this line do ?
Ans)This line checks if the `parts` array has a length of 2, which means it contains the substring that matches the 
desired cookie name. If the condition is true, it executes the following operations:

1. `parts.pop()` removes the last element from the `parts` array, which is the substring that matches the desired 
cookie name, along with the trailing semicolon and whitespace.
2. `.split(';')` splits the substring into an array of substrings at each occurrence of the semicolon.
3. `.shift()` removes the first element from the resulting array, which is the desired cookie value without any 
leading or trailing whitespace.
The resulting value is the extracted cookie value, which is then returned.

*! Q)What does value.split(`; ${name}=`); have effect on `authToken = ${response.data.token}; path=/`
Ans)The line `value.split(`; ${name}=`);` is used to split the cookie string into an array based on the provided 
`name`.

In the case of `value.split(`; ${name}=`)` with `name` being `"authToken"`, it will split the cookie string 
`authToken = ${response.data.token}; path=/` at the occurrence of `"authToken="`.

The resulting array will be `["", " ${response.data.token}; path=/"]`, where the first element is an empty string 
and the second element contains the remaining part of the cookie string.

This split operation helps in extracting the value associated with the cookie by further manipulating the array, as 
shown in the previous explanation.

*! Q)If this is the cookie `authToken = ${response.data.token}; path=/` , Then this line - if (parts.length === 2) 
*! return parts.pop().split(';').shift(); extracts only the value associated with authToken ?
Ans)Yes, that is correct. The line `if (parts.length === 2) return parts.pop().split(';').shift();` is used to 
extract the value associated with the `authToken` cookie.

In the provided cookie string `authToken = ${response.data.token}; path=/`, the `parts` array will be `["authToken 
=", "${response.data.token}; path=/"]`. 

By applying `parts.pop().split(';').shift()`, the following operations are performed:

1. `parts.pop()` removes the last element of the array, which is `${response.data.token}; path=/`.
2. `.split(';')` splits the remaining string at the semicolon, resulting in `["${response.data.token}", " path=/"]`.
3. `.shift()` retrieves the first element of the array, which is `${response.data.token}`.

Therefore, the line effectively extracts the value `${response.data.token}` associated with the `authToken` cookie.

*! Q)document.cookie = `authToken = ${response.data.token}; path=/`; Why are we including path='/' here ? What does 
*! it signify ?
Ans)In the line `document.cookie = `authToken = ${response.data.token}; path=/``, the `path=/` attribute is set for 
the cookie. It signifies the URL path for which the cookie should be sent to the server. Setting `path=/` means 
that the cookie will be sent for all URLs within the domain.

The `path` attribute allows you to control the scope or visibility of the cookie. By specifying a specific path, 
you can restrict the cookie to be sent only for requests matching that path. In this case, with `path=/`, the 
cookie will be sent for all requests within the domain.

Setting `path=/` is commonly used to ensure that the cookie is available to all parts of the website or 
application. This allows the client (browser) to include the cookie in subsequent requests, ensuring that the 
server can identify the user's session or access the token for authentication purposes.

*! Q)localStorage.setItem('userEmail', email); - What does this line do ?
Ans)The line `localStorage.setItem('userEmail', email)` is used to store the value of the `email` variable in the 
client's browser's local storage. 

`localStorage` is a built-in web browser API that allows you to store key-value pairs locally in the client's 
browser. It provides a simple way to store data that persists even when the user navigates away from the current 
page or closes the browser.

In this case, the code is storing the value of the `email` variable in the local storage with the key `'userEmail'`.
This allows you to retrieve and use the stored email value later in your application if needed.

*! Q)localStorage.setItem('userToken', response.data.token); - What is the meaning of this line ?
Ans)The line `localStorage.setItem('userToken', response.data.token)` is used to store the value of the 
`response.data.token` in the client's browser's local storage.

Similar to the previous example, `localStorage.setItem()` is a method provided by the browser's `localStorage` API. 
It allows you to store key-value pairs in the client's browser for persistent storage.

In this case, the code is storing the value of `response.data.token`, which is typically a token received from the 
server, in the local storage with the key `'userToken'`. This allows you to retrieve and use the token later in 
your application, for example, to include it in subsequent API requests for authentication purposes.
*/
import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
import Axios from 'axios'

export default function About(){
    const [text, setText] = useState('')
    const [email, setEmail] = useState('')
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault()
        Axios.post('/submit-form', { text, email })
            .then(response => {
                console.log(response)                
                navigate('/')
            })
            .catch(err => console.log(err))
    }
    return(
        <div>
            <h1>This is the About Page and I am trying to learn React</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={text} onChange={event => {
                    setText(event.target.value)
                }}></input>
                <input type="email" value={email} onChange={event => {
                    setEmail(event.target.value)
                }}></input>
                <button>Submit</button>
            </form>
        </div>
    )
}

/**
*! Q)What is the utility of event.preventDefault() ?
Ans)The `event.preventDefault()` method is used to cancel the default action of an event. This means that if an 
event has a default action associated with it, calling `event.preventDefault()` will prevent that action from 
happening. For example, if you have a form with a submit button, clicking the submit button will normally submit 
the form. However, if you attach an event listener to the submit button and call `event.preventDefault()` within 
the event listener, clicking the submit button will no longer submit the form.

In your code snippet, `event.preventDefault()` is being called within a `handleSubmit` function that is attached 
to an event. This means that when the event is triggered, the default action associated with that event will be 
canceled. Without more context, it is difficult to say exactly what the default action is in this case, but it is 
likely that the `handleSubmit` function is being used as an event listener for a form submission or button click 
event, and calling `event.preventDefault()` is preventing the form from being submitted or the button from 
performing its default action.

*? Thank you for providing more context. In the code you provided, the handleSubmit function is being used as an 
*? event listener for the onSubmit event of a form. When the form is submitted (e.g. by clicking the submit button), 
*? the handleSubmit function is called and passed an event object as its argument. Within the handleSubmit function, 
*? the first line of code is event.preventDefault(), which cancels the default action of the form submission event.

The default action of a form submission event is to send the form data to the server using the method and action 
specified in the form’s attributes. However, since event.preventDefault() is called within the handleSubmit 
function, this default action is canceled, and the form data is not sent to the server in the usual way. Instead, 
the form data is sent to the server using an asynchronous HTTP request made with the Axios library.

After calling event.preventDefault(), the handleSubmit function uses Axios to send a POST request to the 
/submit-form endpoint on the server. The data sent in this request includes the values of the text and email state 
variables, which are updated by the form’s input fields. If the request is successful, a response object is 
returned and logged to the console, and then the user is redirected to the root route (/) using the navigate 
function from React Router. If there is an error with the request, it is caught and logged to the console.

*! Q)You said- 'The default action of a form submission event is to send the form data to the server using the 
*! method and action specified in the form’s attributes. However, since event.preventDefault() is called within the 
*! handleSubmit function, this default action is canceled, and the form data is not sent to the server in the usual 
*! way.'
*! What is the nature of this usual way. even if preventDefault was not used the request would have gone through 
*! axios. So whats the change now ?
Ans)The usual way for a form to submit data to a server is through a synchronous HTTP request. When a form is 
submitted, the browser takes the data entered into the form, encodes it according to the `enctype` attribute of the 
form, and sends it to the server specified in the `action` attribute of the form using the HTTP method specified in 
the `method` attribute of the form. The server then processes the data and sends back a response, which causes the 
browser to load a new page.

In your code, if `event.preventDefault()` was not called within the `handleSubmit` function, submitting the form 
would cause the browser to send a synchronous HTTP request to the server using the method and action specified in 
the form's attributes. However, since you are calling `event.preventDefault()`, this default behavior is canceled, 
and instead, you are sending an asynchronous HTTP request to the server using Axios.

The main difference between these two approaches is that when you use Axios to send an asynchronous request, the 
browser does not have to wait for a response from the server before allowing the user to continue interacting with 
the page. This can improve the user experience by making your application feel more responsive. Additionally, using
Axios allows you to have more control over how the request is sent and how the response is handled.

*! Q)But even if preventDefault was not used Axios is asynchronous and would sent an asynchronous request. No http 
*! request would have been sent.
Ans)If `event.preventDefault()` was not called within the `handleSubmit` function, the form would still submit data 
to the server in the usual way, even if you are also sending an asynchronous request using Axios. This means that 
when the form is submitted, two requests would be sent to the server: one synchronous request sent by the browser 
as a result of the form submission, and one asynchronous request sent by Axios.

Calling `event.preventDefault()` within the `handleSubmit` function prevents the synchronous request from being 
sent by the browser, so only the asynchronous request sent by Axios is actually sent to the server. This allows 
you to have more control over how the request is sent and how the response is handled, and it can improve the user 
experience by making your application feel more responsive.
*? ---------------------------------------------------------------------------------------------------------------

*/
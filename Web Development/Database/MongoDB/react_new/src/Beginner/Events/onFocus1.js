import React from 'react';

class MyInput extends React.Component {
  handleFocus = () => {
    console.log('Input is focused!');
    // Perform any other actions you want when the input is focused
  }

  render() {
    return (
      <input
        type="text"
        onFocus={this.handleFocus}
        placeholder="Enter something"
      />
    );
  }
}
export default MyInput;

/**
*! Q)What speciality does onFocus provides? onSubmit can also do this, or onChange ?
Ans)The `onFocus` event handler in React provides a way to perform actions specifically when an element receives 
focus, whereas `onSubmit` and `onChange` serve different purposes.

Here's a breakdown of each event handler's functionality:

*? 1. `onFocus`: This event handler is triggered when an element receives focus, such as when a user clicks on an 
*? input field or navigates to it using the keyboard. It is useful for scenarios where you want to perform certain 
*? actions when the element becomes the active focus target, like displaying a dropdown menu, showing a tooltip, or 
*? updating the UI in some way.

2. `onSubmit`: This event handler is commonly used with form elements, specifically the `<form>` element. It is 
triggered when the form is submitted, typically by pressing the Enter key or clicking a submit button. It is useful
for scenarios where you want to handle form submission, validate input, make API calls, or perform other actions 
related to form submission.

3. `onChange`: This event handler is triggered when the value of an input element changes, such as when a user 
types into a text field or selects a different option in a dropdown. It is commonly used to capture and react to 
user input, update state, and reflect the changes in the UI.

While there may be some overlap in functionality between these event handlers, they serve different purposes and 
can be used together to handle various user interactions effectively. It's important to choose the appropriate 
event handler based on the specific behavior you want to achieve in your application.
*/
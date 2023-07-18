import React, { useState } from 'react';

export default function OnSubmit1() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here, such as making an API request
    console.log('Form submitted:', formData);
    // Reset the form fields
    setFormData({
      username: '',
      password: '',
    });
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

/**
*! Q)const handleChange = (event) => {
*!    setFormData({
*!      ...formData,
*!      [event.target.name]: event.target.value,
*!    });
*!  };
*! What does this code snippet do? 
Ans)The code snippet you provided is a `handleChange` function in a React component. It is used to update the form 
data state based on user input in the input fields.

Let's break down what the code does - 

1. `(event)` is the parameter that represents the event object triggered by the input field's `onChange` event.
2. `setFormData` is a function provided by the `useState` hook in React. It is used to update the state value of 
`formData`.
3. `{...formData}` is the spread syntax used to create a shallow copy of the existing `formData` state. This 
ensures that the previous values of `formData` are preserved.
4. `[event.target.name]` is a dynamic key using the value of the `name` attribute of the input element. This allows 
us to update the specific field in the `formData` state based on the input element that triggered the `onChange` 
event.
5. `event.target.value` is the value of the input field that the user has entered. It represents the new value for 
the corresponding field in the `formData` state.
6. By using the spread syntax in combination with dynamic key assignment, the code updates only the specific field 
in `formData` that corresponds to the input element being changed, while keeping the other fields unchanged.

In summary, this code snippet allows you to capture user input and update the `formData` state object dynamically, 
field by field, as the user types in the input fields. This ensures that the `formData` state always reflects the 
latest values entered by the user.

*! Q)Why do we even need onChange ? if we just use onSubmit, our form is submitted ? I mean without onChange also 
*! our form gets submitted ?
Ans)The `onChange` event is used to handle user input and update the form data in real-time as the user types or 
selects values in the input fields. It is not directly related to form submission.

While it is true that the form can still be submitted without the `onChange` event, using it allows for a more 
interactive and controlled user experience. Here are a few reasons why the `onChange` event is commonly used-

1. Real-time updates: The `onChange` event allows you to capture user input as they type or make selections in the 
input fields. This can be useful for displaying instant feedback or performing validation checks while the user is 
interacting with the form.

2. Controlled components: In React, it is recommended to use controlled components, where the value of the input 
field is controlled by React state. The `onChange` event is used to update the state with the current value of the 
input field, ensuring that the React component reflects the user's input accurately.

3. Validation and error handling: With the `onChange` event, you can perform input validation and show error 
messages to the user in real-time. For example, you can check if the entered email address is valid or if a 
required field is empty, and display appropriate error messages as the user types.

4. Conditional behavior: The `onChange` event allows you to trigger different actions or behaviors based on user 
input. For instance, you can enable or disable certain form elements dynamically based on the user's input in 
another field.

Overall, using the `onChange` event gives you more control over the form's behavior and allows you to provide a 
better user experience by responding to user input in real-time and performing necessary validations before 
submitting the form.
*/
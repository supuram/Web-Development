import React, { useState } from 'react';

export default function OnChange1() {
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <input type="text" value={value} onChange={handleChange} />
      <p>Value: {value}</p>
    </div>
  );
}

/**
*! Q)handleChange takes event as argument. but where in the code is that value of event passed?
*? Ans)The event is automatically passed to the onChange event handler by React when it's triggered. You don't need 
*? to pass it explicitly in the code. In the handleChange function, the event is automatically passed as the first 
*? argument when the onChange event occurs. By accessing event.target.value, we can retrieve the current value of 
*? the input field.
*/
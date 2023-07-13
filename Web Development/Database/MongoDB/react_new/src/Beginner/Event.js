import React from "react";
import { useState } from "react";

function MyButton() {
    const [count, setCount] = useState(0);
    function handleClick() {
      setCount(count + 1)
    }

    return (
      <button onClick={handleClick}>
        Clicked {count} times
      </button>
    );
}
export default MyButton

/*
The line of code `const [count, setCount] = useState(0);` is a declaration of a state variable in a React 
functional component using the `useState` hook.

Here's a breakdown of what each part of the code means:

- `const`: This keyword is used to declare a constant variable that cannot be reassigned once it's defined.

- `[count, setCount]`: This is an array destructuring assignment. It allows you to extract values from an array and 
assign them to variables. In this case, it assigns the first value of the array returned by the `useState` hook to 
the variable `count`, and the second value to the variable `setCount`.

- `useState(0)`: This is a function call to the `useState` hook. The `useState` hook is a built-in hook provided by 
React that allows functional components to have state. It takes an initial value as an argument and returns an 
array with two elements. The first element (`count` in this case) is the current state value, and the second 
element (`setCount` in this case) is a function that can be used to update the state.

- `0`: This is the initial value passed as an argument to `useState`. In this case, the initial value of `count` 
will be set to `0`.

So, the `useState(0)` hook call initializes a state variable called `count` with an initial value of `0`, and the 
`setCount` function can be used to update the value of `count` in the future.
*/
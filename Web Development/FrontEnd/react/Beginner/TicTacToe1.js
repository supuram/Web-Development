import React from "react";
import { useState } from "react";
import './TicTacToe.css'

function Square({value, onSquareClick}) {
    return <button className="square" onClick={onSquareClick}>{value}</button>;
}

export default function Board() {
    const [xIsNext, setXIsNext] = useState(true); // initializes xIsNext to true
    const [squares, setSquares] = useState(Array(9).fill(null));
    function handleClick(i) {
        const nextSquares = squares.slice();
        if (xIsNext) {
            nextSquares[i] = "X";
          } else {
            nextSquares[i] = "O";
          }
          setSquares(nextSquares);
          setXIsNext(!xIsNext);
    }
    return(
        <>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
    )
}

/**
*! Q)why can't we write this - onSquareClick={handleClick(0)}
Ans)Writing onSquareClick={handleClick(0)} directly would not work as expected because it would call the 
handleClick function immediately and assign its return value (undefined) to the onSquareClick prop. This is 
because the function call handleClick(0) is evaluated immediately during rendering.

To correctly assign a callback function to the onSquareClick prop, you need to wrap it in an arrow function.
The arrow function ensures that the handleClick function is not called immediately during rendering. Instead, it is
assigned as a callback that will be invoked when the Square component's button is clicked.

*! Q)When i write it as callback function how does it understand that it is connected to onClick and should render 
*! only when clicked ?
Ans)In React, when you pass a callback function as a prop, such as `onSquareClick`, it is conventionally assumed 
that the function will be used as an event handler for a specific event, such as the `onClick` event in this case. 

The `Square` component is responsible for rendering a button, and when that button is clicked, the `onClick` event 
is triggered. By providing the `onSquareClick` callback function as the `onClick` event handler, you establish a 
connection between the button click event and the function to be executed when the event occurs.

Here's how it works:

1. In the `Square` component, the button is rendered with the `onClick` event attribute set to the `onSquareClick` 
prop:
<button className="square" onClick={onSquareClick}>{value}</button>

2. When the button is clicked, the `onClick` event is fired, and React automatically invokes the function specified 
in the `onClick` event handler.

3. Since you passed the `onSquareClick` callback function to the `onClick` event handler, it will be executed when 
the button is clicked.

By wrapping the `handleClick` function in an arrow function or using the `bind` method when assigning it to the 
`onSquareClick` prop, you ensure that the `handleClick` function is not executed immediately when the component is 
rendered. Instead, it is invoked as a callback only when the button is clicked.

This way, React establishes the connection between the button's `onClick` event and the specified callback 
function, ensuring that the function is executed only when the button is clicked, and the component is re-rendered 
accordingly based on the state updates within the function.

*! Q)Here what does  setSquares(nextSquares); does? I mean how to dry run this particular line ? nextSquares represents 
*! whole array. so does setSquares value is the whole array ?
Ans)The line `setSquares(nextSquares)` in the provided code is updating the state variable `squares` with the new 
value stored in the `nextSquares` array.

When `setSquares(nextSquares)` is called, it triggers a re-render of the component and updates the state value of 
`squares` to `nextSquares`. In other words, it sets the state of `squares` to the modified version of the array, 
where the element at index `i` is updated with either "X" or "O" based on the condition `xIsNext`.

The `useState` hook is used to define and manage state in React functional components. In this case, the `squares` 
state is initialized as an array of 9 `null` values using `useState(Array(9).fill(null))`. The `setSquares` 
function provided by the `useState` hook allows you to update the value of the `squares` state variable.

By calling `setSquares(nextSquares)`, you are updating the `squares` state with the modified array, reflecting the 
new move (either "X" or "O") at the specified index `i`.

*! Q)But how is the change in squares reflected ? Any change made to nextSquares should not be reflected i squares 
*! as it is assigned by .slice(). But squares is passed as an argument to Square? So how is it done ?
Ans)In React, when you call `setSquares(nextSquares)`, React internally handles the state update process and 
ensures that the component re-renders with the updated state.

The `slice()` method used to create the `nextSquares` array is indeed creating a copy of the `squares` array. This 
is done to avoid directly modifying the original array and follow the principle of immutability, which is important 
in React for efficient rendering and state management.

*? However, when you pass `squares` as a prop to the `Square` component or any other component, React automatically 
takes care of the re-rendering process for those components as well. When the state is updated with `setSquares(next
Squares)`, React compares the new `squares` state with the previous one and identifies the components that depend 
on `squares`. It then re-renders those components with the updated state values.

So, even though you are assigning the modified array to `nextSquares` and then updating the state with `setSquares
(nextSquares)`, React ensures that the changes propagate to the `Square` component or any other component that 
relies on the `squares` state, triggering a re-render and reflecting the updated state in the UI.
*/
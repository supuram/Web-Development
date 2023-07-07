import React, { useState } from 'react';
import TodoForm from './onSubmit2';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  console.log(todos)
  const addTodo = (text) => {
    setTodos([...todos, text]);
  };

  return (
    <div>
      <h1>Todo App</h1>
      <TodoForm addTodo={addTodo} />
      {/* Render your todo list or other components here */}
    </div>
  );
}

export default TodoApp;

/**
In the code you provided, setTodos([...todos, text]) is used to update the todos state variable by adding a new 
todo item to the list.

The setTodos function is the state updater function returned by the useState hook. It is used to update the value 
of the todos state variable, which is an array of todo items.

The expression [...todos, text] creates a new array that contains all of the elements of the todos array, followed 
by the new text value. The spread operator (...) is used to spread the elements of the todos array into the new 
array.

When setTodos is called with this new array as its argument, it updates the value of the todos state variable to 
include the new todo item. This causes the component to re-render and display the updated list of todo items.

In summary, setTodos([...todos, text]) adds a new todo item to the todos state variable and triggers a re-render of 
the component to display the updated list.
------------------------------------------------------------------------------------------------------------------
*? <TodoForm addTodo={addTodo} /> passes the addTodo function from the TodoApp component to the TodoForm component 
*? as a prop. This allows the TodoForm component to call the addTodo function and add new todo items to the list.
*/
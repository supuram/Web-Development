import React, { useState } from 'react';

function TodoForm({ addTodo }) {
  const [todoText, setTodoText] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    if (todoText.trim() === '') {
      // Don't add empty todos
      return;
    }
    addTodo(todoText);
    setTodoText('');
  };

  const handleChange = (event) => {
    setTodoText(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={todoText}
        onChange={handleChange}
        placeholder="Enter a new todo..."
      />
      <button type="submit">Add Todo</button>
    </form>
  );
}
export default TodoForm;

/**
*! Q)What does todoText.trim() do ?
*? Ans)The trim method is a built-in JavaScript string method that removes whitespace characters from both ends of a 
*? string. In the code you provided, todoText.trim() is used to remove any leading or trailing whitespace characters 
*? from the todoText string.

In the context of the handleSubmit function, this is used to check if the todoText string is empty or contains only 
whitespace characters. If todoText.trim() returns an empty string (i.e., if todoText.trim() === ''), then the 
function returns early without adding a new todo item. This prevents the user from adding empty or whitespace-only 
todo items.
------------------------------------------------------------------------------------------------------------------
*! Q)In the TodoForm function it calls addTodo. Why do we again need to <TodoForm addTodo={addTodo} /> in the 
*! TodoApp function ? If you pass addTodo the todoText gets shadowed by it . so how can todoText be passed ?
Ans)In the `TodoForm` component, the `addTodo` function is called with `todoText` as its argument when the form is 
submitted. This adds a new todo item to the list with the text entered by the user.

The `addTodo` function is defined in the `TodoApp` component and passed to the `TodoForm` component as a prop. This 
allows the `TodoForm` component to call the `addTodo` function and add new todo items to the list.

When you write `<TodoForm addTodo={addTodo} />` in the `TodoApp` component, you are passing the `addTodo` function 
from the `TodoApp` component to the `TodoForm` component as a prop. This allows the `TodoForm` component to call 
the `addTodo` function and add new todo items to the list.

The `todoText` state variable is local to the `TodoForm` component and is not shadowed by the `addTodo` prop. When 
you call `addTodo(todoText)` in the `handleSubmit` function, you are passing the current value of the `todoText` 
state variable as an argument to the `addTodo` function.

In summary, `<TodoForm addTodo={addTodo} />` passes the `addTodo` function from the `TodoApp` component to the 
`TodoForm` component as a prop. This allows the `TodoForm` component to call the `addTodo` function and add new 
todo items to the list. The `todoText` state variable is local to the `TodoForm` component and is not shadowed by 
the `addTodo` prop.
------------------------------------------------------------------------------------------------------------------
*! Q)What is the meaning of - as a prop ?
Ans)In React, a prop (short for “property”) is a way to pass data from a parent component to a child component. 
*? Props are passed to a component via its JSX element, using a syntax similar to HTML attributes.
function ParentComponent() {
  const myProp = "Hello, world!";
  return <ChildComponent someProp={myProp} />;
}

function ChildComponent(props) {
  return <div>{props.someProp}</div>;
}
*? When we say that a value is passed “as a prop”, we mean that it is passed from a parent component to a child 
*? component via the child component’s JSX element. The child component can then access the value of the prop via its 
*? props object and use it in its rendering logic.
*/
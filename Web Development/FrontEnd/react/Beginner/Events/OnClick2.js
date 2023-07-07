import React from 'react';

class ToggleParagraph extends React.Component {
  state = {isVisible:false}

  toggleVisibility() {
    this.setState(prevState => ({  // setState is predefined
      isVisible: !prevState.isVisible
    }));
  }

  render() {
    const { isVisible } = this.state;
    return (
      <div>
        <button onClick={() => this.toggleVisibility()}>
          Toggle Paragraph
        </button>
        {isVisible && <p>This paragraph is now visible!</p>}
      </div>
    );
  }
}
export default ToggleParagraph;

/**
Q)Why are we using this.setState instead of only setState?
Ans)In React class components, `this.setState` is used instead of just `setState` to access the `setState` method 
defined in the base class `React.Component`.

When you define a class component that extends `React.Component`, you're creating a subclass that inherits all the 
methods and properties of the base class. In order to access and use the `setState` method provided by 
`React.Component`, you need to use `this.setState`.

By using `this`, you are referring to the current instance of the class component. The `this` keyword is used to 
access the properties and methods of the current object (in this case, the component instance).

When you write `this.setState`, you are explicitly calling the `setState` method of the current instance, which 
allows you to update the state and trigger the re-rendering of the component.

Without using `this`, React would not be able to identify which `setState` method to invoke, as there may be other 
`setState` methods defined outside the component's context.

So, to summarize, `this.setState` is used to access and call the `setState` method of the current class component 
instance, which is necessary to update the state and trigger the component's re-rendering.

*! Q)From where does it get the value of !prevState?
Ans)The value of `!prevState` is obtained from the `prevState` argument passed to the callback function inside 
`this.setState` method. 

In the provided code example -

toggleVisibility() {
  this.setState(prevState => ({
    isVisible: !prevState.isVisible
  }));
}

The `this.setState` method accepts a function as an argument. This function, often referred to as the "updater" 
function, receives the previous state (`prevState`) as its argument. 

In the example, the updater function is defined using the arrow function syntax `(prevState => ({ ... }))`. It 
takes `prevState` as its argument and returns an object representing the updated state.

By using `!prevState.isVisible`, it negates the current value of `isVisible` in the previous state. If `isVisible` 
is `true`, `!prevState.isVisible` will evaluate to `false`, and if `isVisible` is `false`, `!prevState.isVisible` 
will evaluate to `true`.

This approach ensures that the updated state of `isVisible` will always be the opposite of its previous value, 
effectively toggling its boolean state.

By utilizing the previous state (`prevState`) within the updater function, you avoid potential race conditions or 
unexpected behavior that could occur if you relied on the component's current state directly.

To summarize, the value of `!prevState` is derived from the `prevState` argument passed to the updater function, 
allowing you to toggle the value of `isVisible` when updating the component's state.

*! Q)From where does prevState understand that it has to receive the previous state as its argument ? Is it 
*! predefined within the setState function ?
Ans)Yes, the `prevState` argument in the `setState` function is automatically provided by React. It is a predefined 
parameter within the `setState` function, which is part of the base `React.Component` class.

When you call `setState` and pass a function as an argument, React internally invokes that function and passes the 
previous state (`prevState`) as an argument to your function.

Here's an example to illustrate how it works:

this.setState(prevState => ({
  count: prevState.count + 1
}));

In the above code snippet, the updater function receives `prevState` as its argument. It's important to note that 
you can choose any valid parameter name for this argument; it doesn't have to be named `prevState`. The naming 
convention of `prevState` is commonly used to indicate that it represents the previous state.

The `prevState` argument is automatically provided by React so that you have access to the previous state's values 
within the updater function. This allows you to calculate the new state based on the previous state and perform 
state updates safely.

React takes care of managing the state and ensuring that the correct previous state is passed to the updater 
function when `setState` is called. This helps in handling updates in an efficient and reliable manner, avoiding 
race conditions or incorrect state transitions.

So, to summarize, the `prevState` parameter is predefined within the `setState` function by React. It represents 
the previous state of the component and is automatically provided to the updater function you pass to `setState`.

*! Q)const { isVisible } = this.state;
*! What is this.state here? How does the code get the value of state ?
Ans)In the code snippet `const { isVisible } = this.state;`, `this.state` refers to the state object of the current 
instance of the React component.

In a class component, the state is an object that holds the data relevant to that component. It is defined and 
managed within the component's class using the `state` property.

When you access `this.state`, you are accessing the state object specific to the current instance of the component. 
It allows you to retrieve the current values of the state properties.

In the provided code example - 

render() {
  const { isVisible } = this.state;

The `render` method of the `ToggleParagraph` component is being defined. Inside the `render` method, `this.state` 
is accessed to retrieve the current state values.

By destructuring assignment `{ isVisible } = this.state`, the value of `isVisible` is extracted from the 
`this.state` object. It's equivalent to writing `const isVisible = this.state.isVisible;`. This allows you to use 
the `isVisible` variable directly within the `render` method.

Using `const { isVisible } = this.state;` makes the code more concise and easier to read. It assigns the value of 
`this.state.isVisible` to the `isVisible` variable, providing a shorthand way to access the value of a specific
property from the component's state object.

So, in summary, `this.state` refers to the state object of the current instance of the React component. By 
accessing `this.state`, you can retrieve the current values of the state properties, and by using destructuring 
assignment, you can conveniently extract specific property values like `isVisible` for direct use in your code.

*! Q)'State object of the current instance of the React component'. Meaning of the above line.
Ans)In the context of React components, each component instance has its own state object. The state object stores 
and manages the component's data, which can be accessed and modified within the component.

*? When you create a new instance of a class component, React creates a separate state object specifically for that 
*? instance. This means that each instance of the component maintains its own independent state.

For example, if you have multiple instances of the `ToggleParagraph` component rendered on a page, each instance 
will have its own state object with its own set of properties and values.

By referring to the "state object of the current instance of the React component," it means that `this.state` in a 
class component refers to the state object specific to the component instance being rendered or used at that moment.

The `this` keyword refers to the current instance of the class component, and by accessing `this.state`, you are 
accessing the state object associated with that specific instance.

Having separate state objects for each component instance allows you to encapsulate and manage the state locally 
within each instance. It ensures that the state remains isolated and doesn't interfere with other instances or 
components in your application.

So, the "state object of the current instance of the React component" refers to the specific state object 
associated with the particular instance of the component being rendered or used.

The this.state refers to the state object of the current instance of the ToggleParagraph component.

In the constructor, this.state is initialized with an object that contains the initial state values. In this case, 
it includes a property isVisible set to false initially.

Within the render() method, this.state is accessed to retrieve the current values of the state properties. By 
using destructuring assignment const { isVisible } = this.state;, the value of isVisible is extracted from the 
state object and assigned to a local variable.

*! Q)'When you create a new instance of a class component, React creates a separate state object specifically for 
*! that instance'.
*! But in the code, where does the class ToggleParagraph create a new instance of it so that the state object will 
*! be created specifically for that instance?

Ans)In the provided code snippet, a new instance of the `ToggleParagraph` component is created when it is rendered 
by another component or included in the component hierarchy.

For example, let's say you have a parent component that renders the `ToggleParagraph` component like this -

class App extends React.Component {
  render() {
    return (
      <div>
        <ToggleParagraph />
        <ToggleParagraph />
      </div>
    );
  }
}

In this case, the `App` component is rendering two instances of the `ToggleParagraph` component. Each 
`<ToggleParagraph />` JSX element represents a new instance of the `ToggleParagraph` component.

When React encounters these JSX elements during rendering, it creates separate instances of the `ToggleParagraph` 
component for each occurrence. Each instance will have its own independent state object associated with it.

So, in the provided code, the instances of the `ToggleParagraph` component are created implicitly when the parent 
component renders them in its `render()` method. React takes care of creating and managing the component instances 
and their respective state objects.

It's important to note that React components are typically used within a component hierarchy, and the creation of 
component instances is handled by React's rendering process based on how they are included in the JSX markup.

By rendering multiple instances of the `ToggleParagraph` component in different places or multiple times within the 
component hierarchy, you can have separate instances with their own state objects.
*/
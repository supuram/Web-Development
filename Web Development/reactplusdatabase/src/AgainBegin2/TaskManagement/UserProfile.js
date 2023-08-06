import React, { useState, useEffect, useRef } from "react";
import UserProfileDashBoard from './UserProfileDashBoard.js';
import './UserProfile.css';

const UserProfile = () => {
  const [isVisible, setIsVisible] = useState(false);
  const subMenuRef = useRef();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (subMenuRef.current && !subMenuRef.current.contains(event.target)) {
        setIsVisible(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const toggleVisibility = () => {
    setIsVisible(prevState => !prevState.isVisible);
  };

  return (
    <div className={`divUserProfile ${isVisible ? 'visible' : ''}`}>
      <button className="buttonUserProfile" onClick={toggleVisibility}>Profile</button>
      {isVisible && (
        <UserProfileDashBoard ref={subMenuRef} style={{display:'block'}}/>
      )}
    </div>
  );
};
export default UserProfile;

/**
*! Q)What is ref={subMenuRef}
Ans)In React, the `ref` attribute is used to obtain a reference to a React component or DOM element. By 
using the `ref` attribute, you can store a reference to the underlying DOM node or React component 
instance for later access. This is useful when you need to interact with the DOM directly or access 
methods and properties of a React component programmatically.

In the provided code, `ref={subMenuRef}` is used to attach the reference to the `UserProfileDashBoard` 
component. Let's take a closer look at how it works:

1. First, the `useRef` hook is used to create a mutable reference called `subMenuRef`:
*? const subMenuRef = useRef();

2. In the return statement, the `UserProfileDashBoard` component is rendered and has its reference 
attached to the `subMenuRef` using the `ref` attribute:
*? <UserProfileDashBoard ref={subMenuRef} style={{display:'block'}} />

By doing this, the `subMenuRef` will now hold a reference to the actual DOM node of the `UserProfileDash
Board` component. The `ref` attribute allows you to access the properties and methods of the `UserProfile
DashBoard` component directly.

3. The purpose of this specific reference (`subMenuRef`) in the provided code is to determine whether a 
click event occurs outside the `UserProfileDashBoard` component. This functionality is implemented inside 
the `handleOutsideClick` function, which checks if the target of the click event (`event.target`) is not 
inside the `UserProfileDashBoard` component:
const handleOutsideClick = (event) => {
  if (subMenuRef.current && !subMenuRef.current.contains(event.target)) {
    setIsVisible(false);
  }
};

The `subMenuRef.current.contains(event.target)` check verifies if the clicked element (`event.target`) is 
inside the `UserProfileDashBoard` component's DOM node (`subMenuRef.current`). If the click occurs outside 
the dashboard, the `isVisible` state is set to `false`, and the dashboard will be hidden.

In summary, `ref={subMenuRef}` allows the code to track clicks outside the `UserProfileDashBoard` component
by obtaining a reference to its underlying DOM node, which enables specific interactions and logic based 
on the user's actions.

*! Q)What is the meaning of - obtain a reference to a React component or DOM element ?
Ans)Obtaining a reference to a React component or DOM element means creating a way to directly interact 
with or access that specific component or element in your React application. React provides a feature 
called "refs" that allows you to reference and store a direct reference to React components or DOM 
elements.

1. Reference to a React Component:
When you obtain a reference to a React component, you can access the component's methods and properties 
directly from the reference. This allows you to interact with the component programmatically. For example,
if you have a form component and you want to reset its input fields or trigger a specific function inside 
that component, you can do so by using the component's reference.

Here's an example of how to create a reference to a React component:

import React, { useRef } from "react";

const MyComponent = () => {
  const myComponentRef = useRef(null);

  const handleButtonClick = () => {
    // Accessing the component's method directly through the reference
    myComponentRef.current.resetInputFields();
  };

  return (
    <div>
      <MyFormComponent ref={myComponentRef} />
      <button onClick={handleButtonClick}>Reset Fields</button>
    </div>
  );
};

2. Reference to a DOM Element:
When you obtain a reference to a DOM element, you can directly access and manipulate its properties and 
methods. This is useful when you need to perform some DOM-specific operations, such as setting focus on 
an input element, changing its style, or getting its dimensions.

Here's an example of how to create a reference to a DOM element:

import React, { useRef } from "react";

const MyComponent = () => {
  const myButtonRef = useRef(null);

  const handleButtonClick = () => {
    // Accessing the DOM element directly through the reference
    myButtonRef.current.style.backgroundColor = "red";
  };

  return (
    <div>
      <button ref={myButtonRef} onClick={handleButtonClick}>
        Click Me
      </button>
    </div>
  );
};

Using refs to obtain references to components or DOM elements should be done sparingly. In most cases, 
it's better to follow the React data flow principles and manage the component's state and interactions 
through props and callbacks. However, there are certain scenarios where refs can be beneficial, especially
when dealing with external libraries or specific DOM manipulations. Be cautious not to overuse refs, as 
it can lead to less maintainable and harder-to-understand code.

*! Q)mousedown event details
Ans)Apologies for any confusion. I'll clarify the difference between the `mousedown` and `click` events 
and explain how the code detects clicks inside or outside the component.

Both the `mousedown` and `click` events are related to mouse interactions, but they serve different 
purposes:

1. `mousedown` Event:
   - Occurs when the mouse button is pressed down on an element.
   - Triggers before the `click` event.
   - Does not depend on whether the mouse button is released or not.
   - Useful for capturing actions like dragging, highlighting, or any action that occurs when pressing 
   the mouse button down.
   - Not typically used to determine if a click happens inside or outside an element.

2. `click` Event:
   - Occurs when the mouse button is pressed down and then released on the same element.
   - Triggers after the `mousedown` event and once the mouse button is released.
   - Typically used to handle click actions like opening a menu, navigating to a link, or toggling a UI 
   element.

Now, let's understand how the code in question detects clicks inside or outside the component:

const handleOutsideClick = (event) => {
  if (subMenuRef.current && !subMenuRef.current.contains(event.target)) {
    setIsVisible(false);
  }
};

useEffect(() => {
  document.addEventListener('mousedown', handleOutsideClick);
  return () => {
    document.removeEventListener('mousedown', handleOutsideClick);
  };
}, []);

1. The `handleOutsideClick` function is defined to handle clicks that occur outside the `UserProfile` 
component's dashboard.

2. The `mousedown` event listener is attached to the `document` inside the `useEffect` hook. This allows 
the code to detect all `mousedown` events that happen anywhere on the page, regardless of whether it's 
inside or outside the component.

3. When the user clicks anywhere on the page, the `handleOutsideClick` function is executed because the 
event listener is attached to the entire `document`.

4. Inside the `handleOutsideClick` function, the code checks if the `subMenuRef.current` (a reference to 
the `UserProfile` component's dashboard) exists and whether the event target (the element where the 
`mousedown` event occurred) is not inside the `subMenuRef.current`.

5. If the `subMenuRef.current` exists and the event target is not inside it, it means the click occurred 
outside the `UserProfile` component's dashboard. In this case, `setIsVisible(false)` is called, which 
hides the dashboard by updating the `isVisible` state to `false`.

By using the `mousedown` event and checking whether the event target is outside the `UserProfile` 
component's dashboard, the code can detect clicks that occur anywhere on the page and handle them 
accordingly, toggling the visibility of the dashboard appropriately.

*! Q)What is !subMenuRef.current.contains(event.target) ?
Ans)`!subMenuRef.current.contains(event.target)` is a condition used to check whether the target of a 
`mousedown` event is outside the referenced component (`UserProfileDashBoard` component) in the `handleOut
sideClick` function.

Let's break down the expression:

1. `subMenuRef.current`: `subMenuRef` is a React ref created using the `useRef` hook. It contains a 
reference to the DOM node of the `UserProfileDashBoard` component.

2. `event.target`: `event` is the `mousedown` event object that is passed as an argument to the `handleOut
sideClick` function. `event.target` represents the DOM element on which the `mousedown` event occurred 
(i.e., the element that was clicked).

3. `subMenuRef.current.contains(event.target)`: This checks if the `UserProfileDashBoard` component's DOM 
node (referenced by `subMenuRef.current`) contains the DOM element that was clicked (`event.target`). 
The `contains` method is used to determine if an element is a descendant of another element.

4. `!subMenuRef.current.contains(event.target)`: The `!` (logical NOT) operator is used to negate the 
result of `subMenuRef.current.contains(event.target)`. So, the condition will be `true` when the clicked 
element is outside the `UserProfileDashBoard` component's DOM node.

In the context of the `handleOutsideClick` function and the overall code, this condition is checking 
whether the user clicks outside the `UserProfileDashBoard` component. If the condition evaluates to 
`true`, it means that the click occurred outside the component, and the `UserProfileDashBoard` component 
should be hidden (`isVisible` state set to `false`). If the condition evaluates to `false`, it means the 
click occurred inside the component, and no action is taken as the dashboard is already visible.

*! Q)What is DOM vs DOM node ? And what is difference between reference to a react component vs reference 
*! to the DOM node of the react component.
Ans)In the context of web development, the DOM (Document Object Model) and DOM nodes are related concepts:

1. DOM (Document Object Model):
The DOM is a programming interface for HTML and XML documents. It represents the structure of a web page 
as a hierarchical tree-like structure of nodes. Each element, attribute, and text content in an HTML 
document is represented as a node in the DOM tree. The DOM provides a way for programs (like JavaScript) 
to interact with and manipulate the content and structure of web pages dynamically.

2. DOM Node:
A DOM node is a basic building block of the DOM tree. Each element, attribute, and text content in the 
DOM is represented by a DOM node. DOM nodes can be elements (HTML tags), attributes, text, comments, etc. 
Every DOM node has properties and methods that allow you to access and modify its content, attributes, 
and relationships with other nodes.

Now, let's talk about the difference between a reference to a React component and a reference to the DOM 
node of a React component:

1. Reference to a React Component:
When we talk about a reference to a React component, we are usually referring to a reference obtained 
using the `ref` attribute. This reference allows you to directly interact with the instance of the React 
component, including accessing its methods and properties. The reference can be created using `createRef` 
(for class components) or `useRef` (for functional components). It is a reference to the component 
instance in the virtual DOM, not the actual DOM node.

import React, { createRef, useRef } from "react";

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.myComponentRef = createRef();
  }

  render() {
    return <div ref={this.myComponentRef}>Hello, World!</div>;
  }
}

2. Reference to the DOM Node of a React Component:
A reference to the DOM node of a React component refers to the actual DOM element that corresponds to the 
component instance in the virtual DOM. This is typically achieved by using the `ref` attribute with a DOM 
element inside the component. This reference allows you to directly manipulate the DOM element, like you 
would with vanilla JavaScript.

import React, { useRef } from "react";

const MyComponent = () => {
  const myComponentNodeRef = useRef();

  return <div ref={myComponentNodeRef}>Hello, World!</div>;
};

In summary, a reference to a React component allows you to interact with the component instance (in the 
virtual DOM), while a reference to the DOM node of a React component allows you to interact with the 
actual DOM element that corresponds to the component (in the actual DOM). The former is often used to 
access component methods and properties, while the latter is used for direct DOM manipulation.

*! Q)In this code the useRef is used as Reference to the DOM Node of a React Component: or Reference to a 
*! React Component ?
Ans)In this code, `useRef` is used as a reference to the DOM Node of a React Component, not as a 
reference to a React component instance.

Here's how it is being used:

1. First, the `useRef` hook is imported: `import React, { useState, useEffect, useRef } from "react";`.

2. Then, inside the `UserProfile` component, a `useRef` is created and assigned to the variable `subMenu
Ref`: `const subMenuRef = useRef();`.

3. The `subMenuRef` is used as a reference to a specific DOM node, which in this case, corresponds to the 
DOM element of the `UserProfileDashBoard` component.

4. Inside the `useEffect` hook, the code attaches an event listener to the `document` for the `'mousedo
wn'` event. The purpose of this event listener is to detect clicks outside the `UserProfileDashBoard` 
component. When a click occurs outside, the `handleOutsideClick` function is executed, and the dashboard's
visibility is toggled off (`setIsVisible(false)`).

5. In the return statement, the `UserProfileDashBoard` component is conditionally rendered only when 
`isVisible` is `true`. It is wrapped inside curly braces with the `{isVisible && ...}` expression. The 
`UserProfileDashBoard` component is passed the `subMenuRef` using the `ref` attribute: `<UserProfileDash
Board ref={subMenuRef} style={{display:'block'}}/>`.

By using `ref={subMenuRef}` on the `UserProfileDashBoard` component, the code creates a reference to the 
actual DOM node of the `UserProfileDashBoard` component. This reference is then used in the `handleOutside
Click` function to determine if the clicked element is outside the `UserProfileDashBoard` component, 
which helps in toggling the visibility of the dashboard based on clicks inside or outside of it.

In summary, the `useRef` is used in this code as a reference to the DOM node of a React component, 
specifically to track clicks outside the `UserProfileDashBoard` component and control its visibility 
accordingly.

*! Q)What does - document.removeEventListener('mousedown', handleOutsideClick); do? If i don't write it 
*! what will happen ?
Ans)The line `document.removeEventListener('mousedown', handleOutsideClick);` is used to remove the event 
listener attached to the `document` for the `'mousedown'` event. This line of code is inside the `useEffe
ct` hook with a cleanup function, and its purpose is to clean up resources when the component is unmounted.

Let's understand its significance:

1. **Event Listener Addition**:
Earlier in the code, inside the `useEffect` hook, the event listener was added to the `document` for the `'moused
own'` event using `document.addEventListener('mousedown', handleOutsideClick);`. This addition ensures that the 
`handleOutsideClick` function is called every time the user clicks anywhere on the page.

2. **Event Listener Removal (Cleanup)**:
When the component is unmounted or removed from the DOM, React will perform a cleanup process. During this clean
up, the code inside the `return` function of the `useEffect` hook will be executed.

useEffect(() => {
  // ... (event listener addition)

  return () => {
    document.removeEventListener('mousedown', handleOutsideClick);
  };
}, []);

By providing a function as the return value of the `useEffect` hook, it acts as a cleanup function. In this 
specific case, the cleanup function removes the event listener for `'mousedown'` from the `document`. This preven
ts the component from continuing to listen for `'mousedown'` events after it has been removed from the DOM.

3. **Importance of Cleanup**:
Failing to remove an event listener can lead to memory leaks and unexpected behavior. If you don't remove the 
event listener when the component unmounts, the event listener will still be active in memory and can potentially 
cause issues when interacting with other components or when the component is re-mounted later.

By including `document.removeEventListener('mousedown', handleOutsideClick);` in the cleanup function, you 
ensure that the event listener is properly removed, avoiding any potential memory leaks or issues associated 
with having lingering event listeners after the component is no longer in use.

In summary, `document.removeEventListener('mousedown', handleOutsideClick);` removes the event listener for the 
`'mousedown'` event from the `document`. It is necessary to include this cleanup step to ensure the component 
properly cleans up its resources and avoids potential issues when unmounting or re-mounting the component.

*! Q)what is the meaning of - When the component is unmounted or removed from the DOM ? What does this unmounting 
*! look like ? 
Ans)In React, when we talk about a component being "unmounted" or "removed from the DOM," it means that the 
component is no longer part of the rendered user interface and has been taken out of the DOM tree. This occurs 
when a component is no longer needed and is no longer being rendered due to changes in the application's state 
or lifecycle.

Unmounting happens in the following scenarios:

1. **Explicit Unmounting**:
When a component is explicitly removed from the DOM, typically due to some user action or a state change that 
causes the component to be hidden or removed from the UI. For example, if a user closes a modal or navigates to 
a different page, the component associated with that modal or page will be unmounted.

2. **Parent Component Removal**:
When a parent component is unmounted, all its child components are also unmounted as part of the unmounting 
process. This occurs when a parent component is no longer part of the UI due to a state change, conditional 
rendering, or routing changes.

3. **Dynamic Component Rendering**:
When components are conditionally rendered based on certain conditions, they may be unmounted when those 
conditions change. For example, a dropdown menu might be rendered when a user clicks on a button, and then the 
dropdown is unmounted when the user clicks outside the dropdown area.

The unmounting process in React has several steps:

1. **Component's `componentWillUnmount` or Cleanup Effects**: If you are using a class component, the `component
WillUnmount` lifecycle method is called just before the component is unmounted. This is an opportunity to perform 
any necessary cleanup or resource disposal, such as removing event listeners, canceling timers, or clearing 
subscriptions.

2. **Functional Components with `useEffect` Cleanup**: For functional components using the `useEffect` hook, any 
cleanup specified in the `return` function inside the `useEffect` will be executed when the component is 
unmounted.

Here's an example of component unmounting using a functional component with `useEffect`:

import React, { useEffect } from "react";

const MyComponent = () => {
  useEffect(() => {
    console.log("Component is mounted");

    return () => {
      console.log("Component is unmounted (cleanup)");
    };
  }, []);

  return <div>My Component</div>;
};

When the above component is initially rendered, `"Component is mounted"` will be logged to the console. When 
the component is removed from the UI or no longer rendered, `"Component is unmounted (cleanup)"` will be logged, 
indicating that the cleanup function inside `useEffect` is called during unmounting.

In summary, component unmounting refers to the process of removing a component from the DOM when it is no longer 
needed or rendered in the user interface. During unmounting, React provides a way to perform cleanup tasks to 
prevent memory leaks and unwanted side effects when the component is no longer in use.
*/
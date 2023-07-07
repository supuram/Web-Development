import React, { useState } from 'react';

const MyComponent = () => {
  const [draggedItem, setDraggedItem] = useState(null);

  const handleDragStart = (event, data) => {
    setDraggedItem(data);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    // Access the dropped data
    const droppedData = event.dataTransfer.getData('text/plain');
    // Handle the dropped data
    console.log('Dropped data:', droppedData);
    // Clear the dragged item
    setDraggedItem(null);
  };

  return (
    <div>
      <div
        draggable="true"
        onDragStart={(event) => handleDragStart(event, 'Example Data')}
      >
        Drag me!
      </div>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        style={{ border: '1px dashed gray', padding: '1rem', marginTop: '1rem' }}
      >
        {draggedItem ? `Dropped data: ${draggedItem}` : 'Drop here'}
      </div>
    </div>
  );
};
export default MyComponent;

/**
*! Q)handleDragStart(event, 'Example Data')}. What is 'Example Data' ? 
Ans)The event object itself is passed as the first argument automatically when the onDragStart event is triggered.
The second argument, 'Example Data', is an example of additional data or a parameter that you can pass to the event 
handler function. It could represent any relevant data that you want to associate with the drag operation.

*! Q)So when we start to drag, the drag event has been raised and onDragStart is the listener which is called when
*! this event is raised ? How do we get the object of this event ? Is it done automatically by react ?
*? Ans)Yes, when you start to drag an element, the `dragstart` event is triggered, and the `onDragStart` event 
*? handler, if defined, is called in response to that event.

In React, when you attach an event handler like `onDragStart` to an element, the event object is automatically 
passed as the first argument to the event handler function. You don't need to explicitly retrieve the event object 
yourself.

When the `onDragStart` event handler is invoked, you can access the event object within the function by defining a 
parameter to receive it. For example:

const handleDragStart = (event) => {
  // Access the event object
  console.log(event);
};

In this example, the `event` parameter receives the event object, and you can access its properties and methods 
within the event handler function.

React takes care of passing the event object to the event handler for you. When the `dragstart` event is raised, 
React captures the event and invokes the corresponding event handler function with the event object as an argument.

Note that in React, event handlers are synthetic events. React provides a cross-browser compatible wrapper around 
the native browser events. This allows you to work with events consistently across different browsers.

By leveraging React's event handling system, you can conveniently access the event object and perform any necessary 
operations based on the event data within your event handler functions.

*! Q)onDragStart is an event handler. Can we call it as a function which listens to the event being raised ? 
Ans)Here is an example - 
const handleDragStart = (event) => {
  // Handle the drag start event
};

return (
  <div onDragStart={handleDragStart}>
    Drag me!
  </div>
);
In this example, the handleDragStart function is the event handler for the dragstart event. When the dragstart 
event is raised on the <div> element, React automatically calls the handleDragStart function.

You can think of the event handler as a function that is listening for a specific event to be raised. Once the 
event occurs, the event handler is executed, allowing you to perform the necessary actions or handle the event as 
desired.

So, to answer your question, you don't need to explicitly call the onDragStart function yourself. React handles the 
event binding and invocation for you when the event occurs.

*? In the example you provided, onDragStart is not an event handler function itself, but rather a prop that specifies 
*? the event handler function to be called when the dragstart event occurs.

*? In React, the onDragStart prop is used to attach an event handler function to the dragstart event of an element. 
*? When the dragstart event is raised on that element, the specified event handler function (handleDragStart in this 
*? case) is executed.

*! Q)const droppedData = event.dataTransfer.getData('text/plain'); What does this line do ?
Ans)The line `const droppedData = event.dataTransfer.getData('text/plain');` is used to retrieve the data that was 
set on the `dataTransfer` object during the drag operation.

When you initiate a drag operation using the `onDragStart` event, you can use the `setData` method of the 
`dataTransfer` property to set the data that will be transferred during the drag-and-drop process. This data can 
be stored in different formats or types.

In the line you mentioned, `event.dataTransfer.getData('text/plain')` retrieves the data that was set during the 
drag operation. It specifically retrieves the data in the `'text/plain'` format.

Here's how it works:

1. During the `onDragStart` event, you would typically set the data using `event.dataTransfer.setData(format, data)`. 
For example, you might have something like `event.dataTransfer.setData('text/plain', 'Example Data')` to set the 
data as plain text.

2. In the `onDrop` event handler or any other relevant event, you can use `event.dataTransfer.getData(format)` to 
retrieve the data. The `format` parameter should match the format used when setting the data.

In the line `const droppedData = event.dataTransfer.getData('text/plain');`, it retrieves the data that was set in 
the `'text/plain'` format during the drag operation. The retrieved data is then assigned to the `droppedData` 
variable.

You can use the `droppedData` variable to access the transferred data and perform further operations or update the 
state of your application based on the dropped data.

Please note that the `dataTransfer` object and its associated methods (`setData`, `getData`) are part of the Drag 
and Drop API and are available on the event object during drag and drop operations.
*/
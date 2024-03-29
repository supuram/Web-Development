import React from 'react';

const DropdownMenuinTask = ({ currentUser }) => {
  return (
    <div>
        <label>Task Assigned by</label>
        <p>{currentUser}</p>
    </div>
  );
};
export default DropdownMenuinTask;


/**
*! Q)Why do we need useEffect here ? We could have directly written 
*! const usernames = await getAllUsernames();
*! setUsernames(usernames);
Ans)The `useEffect` hook is used in this scenario to fetch the usernames asynchronously and update the 
state (`usernames`) when the component mounts.

If you directly wrote `const usernames = await getAllUsernames(); setUsernames(usernames);` outside of 
the `useEffect` hook, it would run synchronously when the component is rendered. This means that the code 
would fetch the usernames and update the state immediately before the component is fully rendered to the 
screen. It may cause issues if the component relies on the usernames to render its content correctly.

By using the `useEffect` hook with an empty dependency array (`[]`), the code inside it runs only once 
when the component mounts. This allows the component to render initially without waiting for the 
asynchronous data to be fetched. Once the data is fetched, it updates the state, triggering a re-render 
of the component with the correct data.

Using `useEffect` in this way ensures that the component renders without any blocking delays caused by 
asynchronous operations, resulting in a smoother user experience.

*! Q)What is the meaning of - This means that the code would fetch the usernames and update the state 
*! immediately before the component is fully rendered to the screen. I mean if the code fetches the 
*! username it will show it, whether it does it before the component is rendered or not, what difference 
*! does it make ? Username will appear.
Ans)Apologies for the confusion. Let me clarify the statement.

When I mentioned that the code would fetch the usernames and update the state immediately before the 
component is fully rendered to the screen, what I meant is that the rendering process can be interrupted 
or delayed if the code fetching the usernames is synchronous and takes a significant amount of time to 
complete. This can result in a slower rendering process or even a temporary blank screen until the 
usernames are fetched and the state is updated.

By using the `useEffect` hook, the fetching of usernames is performed asynchronously, allowing the 
component to continue rendering and showing its initial content while the usernames are being fetched in 
the background. Once the usernames are fetched, the state is updated, triggering a re-render of the 
component with the correct usernames. This helps ensure a smoother user experience and prevents any 
potential delays or interruptions in rendering.

In summary, using `useEffect` with an empty dependency array allows the component to render and display 
its initial content while the asynchronous data fetching operation is taking place in the background, 
resulting in a more responsive and seamless user interface.
*/
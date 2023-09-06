/**
*! NotificationDashboard.js
*! dispatch(acceptFriendRequest());
*! In actions.js 
export const acceptFriendRequest = () => {
    return {
      type: 'ACCEPT_FRIEND_REQUEST'
    };
};  

*! So here dispatch is calling the acceptFriendRequest and acceptFriendRequest is going to store.js to make the value of friendRequest to true in store.js 
case 'ACCEPT_FRIEND_REQUEST':
      return {
        ...state,
        friendRequest: {
          accepted: true
        }
};

*? Exactly, your understanding is correct!

*? When you call `dispatch(acceptFriendRequest())`, it triggers the `acceptFriendRequest` action creator. This action creator returns an action object with a `type` of `'ACCEPT_FRIEND_REQUEST'`. The reducer in your `store.js` file listens for actions of this type and updates the state accordingly.

*? When the reducer encounters an action of type `'ACCEPT_FRIEND_REQUEST'`, it returns a new state object that has the `friendRequest` slice with `accepted` set to `true`. This state update propagates through Redux, and any components that are subscribed to this state using the `useSelector` hook will re-render to reflect the updated state.

*? So, when you dispatch the `'ACCEPT_FRIEND_REQUEST'` action, you are effectively updating the state to mark that the friend request has been accepted, and this state change triggers your component to re-render with the updated state value.

*! What is state in const requestAccepted = useSelector(state => state.friendRequest.accepted);
*? Yes, you're correct! In the context of `useSelector`, the `state` is indeed the entire Redux store's state. So, when you use `useSelector(state => state.friendRequest.accepted)`, you're accessing the `accepted` property from the `friendRequest` slice of the Redux store's state.

Here's a breakdown of the flow:

*? 1. **Redux Store Setup:**

*?   Your Redux store is configured using the `reducer` function in your `store.js` file. This reducer function defines how the state changes in response to dispatched actions. The state returned by this function represents the entire state tree of your application.

*? 2. **State Object:**

*?   In the context of your `reducer` function:

*!    - The `state` parameter represents the current state of your application.
*?    - The `action` parameter represents the action that has been dispatched.

*?   In the `state` object, you have different slices representing different parts of your application's state.

*? 3. **Using `useSelector`:**

   When you use the `useSelector` hook in your component:

*?    - The `state` argument you provide to the callback function (`state => state.friendRequest.accepted`) refers to the entire state of your Redux store.
*?    - `state.friendRequest` accesses the `friendRequest` slice of your state, which contains the `accepted` property.

*? So, in summary, `state` in `useSelector(state => state.friendRequest.accepted)` refers to the entire state object managed by Redux, and you're accessing the specific property `accepted` from the `friendRequest` slice of that state object.
*/
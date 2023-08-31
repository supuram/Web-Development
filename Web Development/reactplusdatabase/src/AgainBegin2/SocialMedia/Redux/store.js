import { configureStore } from '@reduxjs/toolkit';

const initialState = {
  friendRequest: {
    accepted: false
  }
};

// Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ACCEPT_FRIEND_REQUEST':
      return {
        ...state,
        friendRequest: {
          accepted: true
        }
      };
    default:
      return state;
  }
};

const store = configureStore({
  reducer: reducer,
  preloadedState: initialState
});

export default store;
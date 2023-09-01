import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/es/storage/session.js'

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

// Configuration for redux-persist
const persistConfig = {
  key: 'root', 
  storage: storageSession,    
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, reducer);

// Configure your Redux store with the persisted reducer
const store = configureStore({
  reducer: persistedReducer,
  preloadedState: initialState
});

// Create a persistor using persistStore
export const persistor = persistStore(store);

export default store;
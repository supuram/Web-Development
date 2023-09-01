import React from 'react';
import ReactDOM from 'react-dom/client';
import store from './AgainBegin2/SocialMedia/Redux/store.js'
import { Provider } from 'react-redux' 
//import App from './Beginner/User_Authentication/13_ForgotPassword/App.js';
//import App from './AgainBegin2/Education_New/App.js'
//import App from './AgainBegin2/EducationWebsite/App.js'
import App from './AgainBegin2/SocialMedia/Frontend/App.js'
//import App from './AgainBegin2/ChickenWebsite/App.js'
import reportWebVitals from './reportWebVitals.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDq0b3Yco5gNsZMESUKLjmjyQSzr_c3JbU",
  authDomain: "userauth-78afd.firebaseapp.com",
  projectId: "userauth-78afd",
  storageBucket: "userauth-78afd.appspot.com",
  messagingSenderId: "210550535511",
  appId: "1:210550535511:web:f0e117aba95d1ac886ba12",
  measurementId: "G-XC35MSY0QX"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

export { firebase, auth };
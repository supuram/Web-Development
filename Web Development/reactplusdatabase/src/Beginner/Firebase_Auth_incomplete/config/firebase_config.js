// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const app = initializeApp(firebaseConfig); // predefined
const analytics = getAnalytics(app);  // predefined

export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const db = getFirestore(app)
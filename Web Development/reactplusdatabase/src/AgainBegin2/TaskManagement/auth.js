// auth.js
import 'firebase/auth';
import { auth } from './firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const db = firebase.firestore();

// Register a new user
export const register = async(username, email, password) => {
  // Create a new user with the specified email and password
  const userCredential = await auth.createUserWithEmailAndPassword(email, password);
  const user = userCredential.user;

  // Update the user's profile with their username
  await user.updateProfile({
    displayName: username,
  });

  await db.collection('users').doc(user.uid).set({
    username: username,
    email: email,
  });
};

// Send email verification
export const sendEmailVerification = () => {
  return auth.currentUser.sendEmailVerification();
};

// Log in with email and password
export const login = (email, password) => {
  return auth.signInWithEmailAndPassword(email, password);
};

// Log out the current user
export const logout = () => {
  return auth.signOut();
};

// Send password reset email
export const sendPasswordResetEmail = (email) => {
  return auth.sendPasswordResetEmail(email);
};

// Reset password with a new password
export const confirmPasswordReset = (code, newPassword) => {
  return auth.confirmPasswordReset(code, newPassword);
};
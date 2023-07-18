// auth.js
import 'firebase/auth';
import { auth } from './firebase';

// Register a new user
export const register = (email, password) => {
  return auth.createUserWithEmailAndPassword(email, password);
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
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [userProfile, setUserProfile] = useState(null); // Add userProfile state

    const setCurrentUserHandler = (user, profile) => {
        setCurrentUser(user);
        setUserProfile(profile);
    };

    // Other authentication-related functions

    const contextValue = {
        currentUser,
        userProfile, // Include userProfile in the context
        setCurrentUser: setCurrentUserHandler,
        // Other authentication-related functions
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth() {
    return useContext(AuthContext);
}

export { AuthProvider, useAuth };
let authToken = '';

export const setAuthToken = (token) => {
    authToken = token;
};

export const getAuthToken = () => {
    return authToken;
};
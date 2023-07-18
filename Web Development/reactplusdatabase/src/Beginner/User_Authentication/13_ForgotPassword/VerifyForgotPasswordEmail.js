import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const VerifyForgotPasswordEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    async function verifyEmail(token) {
      try {
        const response = await axios.get(`/verify-forgot-password-email/${token}`);
        // Process the response if needed
        console.log(response.data);
        // Redirect the user to the PasswordResetPage with the resetToken as a query parameter
        navigate(`/PasswordResetPage?resetToken=${token}`);
      } 
      catch (error) {
        // Handle errors
        console.error(error.response.data);
      }
    }
    verifyEmail(token);
  }, [token]);

  return (
    <div>
      <h1>Email Verification Page</h1>
      {/* Other components and content */}
    </div>
  );
};
export default VerifyForgotPasswordEmail;
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const VerifyForgotPasswordEmail = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const resetToken = searchParams.get('resetToken');
  console.log(resetToken)
  const navigate = useNavigate();
  useEffect(() => {
    async function verifyEmail(resetToken) {
      try {
        console.log('i am inside VerifyForgotPasswordEmail')
        const response = await axios.get(`/verify-forgot-password-email?resetToken=${resetToken}`);
        // Process the response if needed
        console.log('I am out of VerifyForgotPasswordEmail')
        console.log('VerifyForgotPasswordEmail = ', response.data.message);
        // Redirect the user to the PasswordResetPage with the resetToken as a query parameter
        navigate(`/PasswordResetPage?resetToken=${resetToken}`);
      } 
      catch (error) {
        // Handle errors
        console.log('An error has occured in VerifyForgotPasswordEmail')
        console.error(error.response.data);
      }
    }
    verifyEmail(resetToken);
  }, [resetToken]);

  return (
    <div>
      <h1>Email Verification Page</h1>
      {/* Other components and content */}
    </div>
  );
};
export default VerifyForgotPasswordEmail;
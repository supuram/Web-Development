export const UPDATE_EMAIL_SENDER = 'UPDATE_EMAIL_SENDER';

export const updateEmailSender = (email, sender) => ({
  type: UPDATE_EMAIL_SENDER,
  payload: { email, sender }
});
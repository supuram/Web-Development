Q)Why my approach in this code base is very bad ?
Ans)The approach of using a Link component to navigate to the logged-out homepage when the user clicks 
on the logout button only changes the URL and displays the content of the logged-out homepage. It does 
not actually log out the user or clear any authentication-related data such as cookies or tokens that 
may be used to authenticate the user.

To properly implement the logout functionality, you need to create a handleLogout function that clears 
any authentication-related data and redirects the user to the LoggedOutHomePage when the logout button 
is clicked. 

Q)Why is it necessary to clear any authentication-related data such as cookies or tokens ?
Ans)It is necessary to clear any authentication-related data such as cookies or tokens when the user 
logs out to ensure that the user’s session is properly terminated and their account is secure. Cookies 
or tokens are used to authenticate the user and keep them logged in, so if they are not cleared when 
the user logs out, the user’s session may remain active and their account may be vulnerable to 
unauthorized access.

Clearing authentication-related data when the user logs out is a standard security practice that helps 
to protect the user’s account and personal information. It ensures that the user’s session is properly 
terminated and that any sensitive information stored in cookies or tokens is removed.
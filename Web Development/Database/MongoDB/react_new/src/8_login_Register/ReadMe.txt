In this codebase
I have a Home Page with a navbar, a Login button and a Register button. When I click on the Register
button it takes me to the Register_Page where i can register the users and the data will get into the
database. If the user is already registered which the code will check by checking the email of the user,
the user is returned to the Home Page where he can just click on the Login button and login with the 
email and password.  
Similarly when the user clicks on the Login Button on the Home Page it takes him to the Login_Page where
the user can enter his email and password and it will redirect him to the Home Page. If the email does 
not match with the emails in the database, then the user is redirected to the Home Page where he can 
click on the Register Button and register himself for the website.

I have still not implemented jwt token and Logout functionality for this code and will do them in the 
subsequent codebase. 
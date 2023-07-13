Here i will write in details for a beginner on how i integrated frontEnd with BackEnd.

Inside my MongoDB folder i created a folder name backend. Inside backend folder I had a file named index.js. I 
came to the backend folder in VSCode terminal and typed npm init. This creates a json file. But on hindsight maybe
npm init was not needed as I had all the dependencies installed in the MongoDB folder. 

Now I navigated to MongoDB folder inside my VSCode terminal and typed-
npm i -g create-react-app
Next i again typed npx create-react-app react_new
This created a react_new folder inside my MongoDB folder. 
Inside react_new folder I had all the react folders preinstalled - namely node_modules, public, src.
Inside src I had index.js, App.js. Remember everything inside src is frontend now. In the FrontEnd folder you 
are seeing now, I copied these files inside src and put them in the FrontEnd folder. Now inside react_new folder 
in the VSCode terminal I type- npm i express axios. This add these dependencies in the package.json inside react_new
folder. Now I start writing inside App.js.
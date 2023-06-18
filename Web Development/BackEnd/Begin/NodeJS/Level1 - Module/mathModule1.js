const addFunction = require('./mathModule');
console.log(addFunction(2, 3)); // logs 5

/*
In this example, we have a file called mathModule.js that exports a function called add. In mathModule1.js, we use 
require() to include the exported function from mathModule.js and assign it to a variable called addFunction. 
We can then call addFunction(2, 3) to execute the function and log the result to the console.  We assigned the 
exported function from mathModule.js to a variable called addFunction, so we need to use that variable name when 
calling the function. If you try to call addfun(2, 3) instead of addFunction(2, 3), you will get a ReferenceError: 
addfun is not defined because addfun is not a defined variable.
*/
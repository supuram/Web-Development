/*
Each file in NodeJS is considered a module and every variable and functions defined in that file are scoped to 
that module. They are not available outside of that module. 
*/

let a = require('./Module2.js')
// require() returns the object that is exported from the target module 
console.log(a)
a.myOwnFunction("I love NodeJS")
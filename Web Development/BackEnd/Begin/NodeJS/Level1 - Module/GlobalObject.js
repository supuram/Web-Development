/*
ALl these are global objects belonging to the window object
console.log
setTimeout()
clearTimeout()
setInterval()
clearInterval()
*/

let message = 'abc'
console.log(global.message)

/* In Node we don't have the window object. Instead we have another object called global. console belongs to the 
global object. So you can also write global.console.log. But variables like message are not added to the global 
object. So when you execute the above code it shows undefined. 
*/

console.log(module)
// Each file in NodeJS is considered a module
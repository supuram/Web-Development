var url = 'http://mylogger/io/log'
// we are going to send an http request to the above URL
function myMessage(message){
    // Send an HTTP request
    console.log(message)
}
b = [2,4,'ishita',false,'a']
module.exports.myOwnFunction = myMessage
module.exports.myOwnURL = url
module.exports.b = b
console.log(__filename)
console.log(__dirname)

/*
Node does not execute this code directly. It wraps it inside of a function. At runtime this code is converted to 
(function(exports, require, module, __filename, __dirname){
    body of the above code Module2.js
})
*/

/* module.exports is an object that is used to export values from a Node.js module. When you assign a value to a 
property of module.exports, that value becomes available to other modules that require the module. */
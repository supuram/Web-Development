const a = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

a.question('What is your name?', name => {
    console.log(`Hello ${name}!`);
    a.close();
});

/*
require('readline') returns an object. In Node.js, require() is a built-in function that is used to 
import modules. When you call require() with the name of a module as an argument, it returns the exported
contents of that module. In this case, require('readline') imports the built-in readline module and 
returns an object containing the methods and properties exported by the module.

The readline module in Node.js provides a way to read data from a readable stream (such as process.stdin)
one line at a time. It provides an interface for reading lines from the input stream and writing to the
output stream. The module contains several methods for interacting with the user, including question(),
which prompts the user for input and passes the input to a callback function when the user presses enter.

The createInterface() method is a method of the readline module in Node.js. It is used to create a new 
InterfaceConstructor object. The object returned by require('readline') is an instance of the readline 
module, which contains several methods for interacting with the user, including the createInterface() 
method.

An InterfaceConstructor object is an instance of the InterfaceConstructor class in Node.js. Instances of
this class are constructed using the readline.createInterface() method. The InterfaceConstructor class
extends the EventEmitter class and provides an interface for reading lines from an input stream and 
writing to an output stream.
*/
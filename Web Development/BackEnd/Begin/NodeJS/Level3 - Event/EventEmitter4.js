const EvEmitter = require('events')
var url = 'http://mylogger/io/log'

class Logger extends EvEmitter{
    myEvent(message){ // When a function is inside a class we say it is a method of that class
        // Send an HTTP request
        console.log(message)

        // Raise an event
        this.emit('Message', {id: 1, url: 'https://abc.com'})
    }
}
module.exports.myClassLogger = Logger
module.exports.url = url

/*
this.emit is a method call that emits an event. The emit method is a method of the EventEmitter class from the 
events module, which the Logger class extends. This means that instances of the Logger class have access to the 
emit method.

In JavaScript, the `this` keyword refers to the object that the current function is being called on. It allows you 
to access the properties and methods of that object from within the function.

In the code you provided earlier, the `myEvent` method of the `Logger` class is calling `this.emit('Message', {id: 
1, url: 'https://abc.com'})`. In this case, `this` refers to the instance of the `Logger` class that the 
`myEvent` method is being called on. By calling `this.emit`, the `myEvent` method is calling the `emit` method on 
that instance of the `Logger` class.

Using `this` is necessary in this case because the `emit` method is an instance method of the `EventEmitter` class, 
which means it can only be called on instances of that class (or classes that extend it, like the `Logger` class). 
By calling `this.emit`, you are calling the `emit` method on the specific instance of the `Logger` class that the 
`myEvent` method is being called on.

In summary, you need to use `this` in order to call instance methods and access instance properties of the object 
that a function is being called on. In this case, it allows you to call the `emit` method on a specific instance of 
the `Logger` class.

You cannot call myEvent.emit because myEvent is a method of the Logger class, not an instance of the Logger class 
or the EventEmitter class. The emit method is an instance method of the EventEmitter class, which means it can only 
be called on instances of that class (or classes that extend it, like the Logger class).
*/
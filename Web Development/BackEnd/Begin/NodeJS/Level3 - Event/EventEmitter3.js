// const EvEmitter = require('events')
/*
This will import the name property from the exports of event4.js and assign it to a local variable named 
NewClass. Then you can use it to create a new instance of the NewClass class
*/
const {myClassLogger: NewClass} = require('./EventEmitter4.js')
const myMessage = new NewClass()

myMessage.addListener('Message', function(eventArg){ 
    console.log('Listener Called', eventArg)
})

console.log(myMessage)
myMessage.myEvent('Ishita')

/*
Even if you don't write const EvEmitter = require('events') it is OK because - 
The addListener method is inherited from the EventEmitter class in the events module. In your code, the 
NewClass class extends the EventEmitter class, which means that it inherits all of its methods, including the 
addListener method.

When you create a new instance of the NewClass class using const myMessage = new NewClass(), the resulting 
object has access to all the methods of both the NewClass class and its parent class, EventEmitter. That’s 
why you can call the addListener method on the myMessage object even though you didn’t explicitly define it 
in your code.

In other words, when you call myMessage.addListener(...), JavaScript looks for the addListener method on the 
myMessage object. If it doesn’t find it there, it looks for it on the prototype of the myMessage object, 
which is the prototype of the NewClass class. If it doesn’t find it there either, it looks for it on the 
prototype of the parent class, which is the prototype of the EventEmitter class. Since the EventEmitter class
has an addListener method, JavaScript finds it there and calls it with the arguments you provided.
*/

/*
If we write this code it will not work
const {myClassLogger: NewClass} = require('./EventEmitter4.js')

NewClass.addListener('Message', function(eventArg){ 
    console.log('Listener Called', eventArg)
})

console.log(NewClass)
NewClass.myEvent('Ishita')

The code you provided will not work because NewClass is a reference to the Logger class itself, not an instance of 
the class. The addListener and myEvent methods are instance methods, which means they can only be called on 
instances of the Logger class, not on the class itself.

In order to use the addListener and myEvent methods, you need to create a new instance of the Logger class by 
calling its constructor with the new keyword. You can do this by calling the methods on the myMessage object, which 
is an instance of the Logger class.

A detailed explanation of Class - 
A class is a blueprint for creating objects, while an instance of a class is an actual object created using that 
blueprint. When you define a class, you specify the properties and methods that instances of that class will have. 
However, the class itself does not have those properties and methods - only instances of the class do.

For example, let’s say you have a Car class that has a drive method. You can create multiple instances of the Car 
class, each representing a different car. Each car can drive independently of the others, and each car can have its 
own state (such as its current speed or location). However, the Car class itself does not have a current speed or 
location - those are properties of individual instances of the Car class
*/

/*
In the line `const {myClassLogger: NewClass} = require('./EventEmitter4.js')`, you are using object destructuring 
and renaming syntax to import the `myClassLogger` property from the object exported by `EventEmitter4.js` and 
assign it to a new variable called `NewClass`. This means that `NewClass` is now a reference to the value of the 
`myClassLogger` property exported by `EventEmitter4.js`.

In `EventEmitter4.js`, you have defined a class called `Logger` that extends the `EventEmitter` class from the 
`events` module. This means that instances of the `Logger` class will have all the properties and methods of the 
`EventEmitter` class, as well as any additional properties and methods that you define in the `Logger` class. You 
then assign the `Logger` class to the `myClassLogger` property of the object that you export from `EventEmitter4.js`.

When you import the `myClassLogger` property from `EventEmitter4.js` and assign it to the variable `NewClass`, you 
are essentially creating a new reference to the `Logger` class. This means that when you call `new NewClass()`, you 
are creating a new instance of the `Logger` class. This instance will have all the properties and methods of the 
`EventEmitter` class, as well as any additional properties and methods that you defined in the `Logger` class.

In summary, when you use object destructuring and renaming syntax to import the `myClassLogger` property from 
`EventEmitter4.js`, you are creating a new reference to the value of that property, which is the `Logger` class. 
When you create a new instance of this class using the `new` keyword, you get an object that has all the properties 
and methods defined by both the `EventEmitter` and `Logger` classes.
*/
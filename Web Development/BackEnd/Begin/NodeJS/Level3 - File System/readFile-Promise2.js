const {readFile} = require('fs')

const getText = (path) => {
    return new Promise((resolve, reject) => { /* This line of code creates a new Promise object. A Promise is an 
    object that represents the eventual completion or failure of an asynchronous operation. It takes in a callback 
    function as an argument, which has two parameters: resolve and reject. */
        readFile(path, 'utf8', (err, data) => {
            if(err){
                reject(err)
            }
            else{
                resolve(data)
            }
        })
    })
}

const start = async() => {
    try{
        const first = await getText('textFile.txt') // assigns the resolved value to first
        const second = await getText('textFile2.txt')
        console.log(first)
        console.log(second)
    }
    catch(error){
        console.log(error)
    }
}
start()

/*
The async keyword is used to define an asynchronous function. An asynchronous function is a function that returns a 
Promise object and can be used with the await keyword.

The await keyword is used inside an async function to pause the execution of the function until a Promise is 
resolved or rejected. This allows you to write asynchronous code in a more readable and synchronous-like manner.

In short, async and await are keywords used to define and work with asynchronous functions in JavaScript.
*/

/*
Promise is a built-in object in JavaScript and is not an instance of any class. It is a constructor function that 
creates and returns a new Promise object. You can use the new keyword to create a new Promise object by calling the 
Promise constructor and passing in a callback function as an argument.

In JavaScript, functions can be used as constructors to create new objects. When you use the new keyword with a 
function, it creates a new object and sets the this keyword inside the function to refer to the newly created object. 
The function can then use this to add properties and methods to the object.

In short, Promise is a built-in constructor function in JavaScript that creates and returns a new Promise object.

A constructor function is a special type of function in JavaScript that is used to create and initialize new objects. 
It is called with the `new` keyword and returns a new object.
When you use the `new` keyword with a constructor function, it creates a new object and sets the `this` keyword 
inside the function to refer to the newly created object. The constructor function can then use `this` to add 
properties and methods to the object.
Constructor functions are named with an uppercase first letter by convention, to distinguish them from regular 
functions. Here's an example of a constructor function that creates a new `Person` object:

function Person(name, age) {
    this.name = name;
    this.age = age;
}

const john = new Person('John', 30);
console.log(john.name); // 'John'
console.log(john.age); // 30

In this example, the `Person` function is a constructor function that takes in two arguments: `name` and `age`. It 
uses the `this` keyword to add these properties to the newly created object. We can then use the `new` keyword to 
create a new `Person` object and assign it to the variable `john`. We can access the properties of the `john` 
object using dot notation.
In short, a constructor function is a special type of function in JavaScript that is used to create and initialize 
new objects.
*/
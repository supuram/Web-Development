/*
In JavaScript, functions are first-class objects, which means that they can be treated like any other value and can 
be assigned to variables, passed as arguments to other functions, and returned as values from other functions.

When you pass a function as an argument to another function (like when you pass the handleClick function as the 
second argument to the addEventListener method), you’re not passing the function itself, but rather a reference to 
the function. This means that the function is not called or executed at that point; instead, a reference to the 
function is passed to the addEventListener method so that it can call the function later when the specified event 
occurs.

document.querySelector("button").addEventListener("click", handleClick)

function handleClick(){
    alert("I got clicked")
}

In other words, passing a reference to a function means that you’re giving the called function (in this case, the 
addEventListener method) the ability to call the referenced function (in this case, the handleClick function) at 
a later time.

Here’s an example that demonstrates how passing a reference to a function works:
*/ 

function sayHello() {
    console.log('Hello!');
}

function callFunction(func) {
    func();
}

callFunction(sayHello);

/*
In this example, we define two functions: sayHello and callFunction. The sayHello function logs the string “Hello!”
to the console when it’s called. The callFunction function takes a single argument func, which is expected to be a 
reference to a function. When callFunction is called, it calls the function referenced by its func argument.

When we call callFunction and pass it a reference to the sayHello function (by writing callFunction(sayHello) 
without parentheses after sayHello), it calls the sayHello function and logs “Hello!” to the console.
*/

/*
A reference to a function is a value that points to the memory location where the function is stored. When you pass 
a reference to a function as an argument to another function, the reference is copied and passed to the called 
function, allowing it to access and call the referenced function.

The reference itself is an internal value that’s not directly accessible or visible to JavaScript code. It’s stored
in memory and managed by the JavaScript engine.

function sayHello() {
    console.log('Hello!');
}

let myFunction = sayHello;

myFunction(); // "Hello!"

In this example, we define a sayHello function that logs the string “Hello!” to the console when it’s called. We 
then assign a reference to the sayHello function to a variable named myFunction. This creates a new reference to 
the sayHello function and stores it in the myFunction variable.

When we call myFunction by writing myFunction(), it calls the sayHello function (because myFunction holds a 
reference to it) and logs “Hello!” to the console.

In summary, a reference to a function is an internal value that points to the memory location where the function 
is stored. When you pass a reference to a function as an argument to another function, the reference is copied and 
passed to the called function, allowing it to access and call the referenced function.
*/
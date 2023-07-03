/* Here’s an example that demonstrates how methods defined on a constructor’s prototype property are inherited 
by all objects created using that constructor - */

function Person(name, age) {
    this.name = name;
    this.age = age;
}
  
Person.prototype.greet = function() {
    console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
};

const alice = new Person("Alice", 30);
const bob = new Person("Bob", 40);
  
alice.greet(); // "Hello, my name is Alice and I am 30 years old."
bob.greet(); // "Hello, my name is Bob and I am 40 years old."

console.log(alice)
console.log(bob)

const prototype = Object.getPrototypeOf(Person);
const methods = Object.getOwnPropertyNames(prototype)
console.log(methods)

/*
Since the greet method is defined on the Person.prototype object, both object instances inherit this method 
through the prototype chain. When we call the method on each object instance, it logs a greeting message to 
the console that includes the values of the name and age properties of that object instance.

This example demonstrates how methods defined on a constructor’s prototype property are inherited by all 
objects created using that constructor. We only need to define the method once on the constructor’s prototype, 
and all object instances created using that constructor will have access to that method through their prototype.
*/
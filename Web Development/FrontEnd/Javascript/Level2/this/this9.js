function Person(name) {
    this.name = name;
    this.introduceSelf = function () {
      console.log(`Hi! I'm ${this.name}.`);
    };
}

const a = new Person("Tree");
a.introduceSelf();

const b = new Person("Mountain");
b.introduceSelf();  

/**
See MDN Docs for constructor and new keyword
A constructor is just a function called using the new keyword. When you call a constructor, it will -
a)create a new object
b)bind 'this' to the new object, so you can refer to 'this' in your constructor code
Here, a is an object. It is an instance of the Person class, created using the new keyword and the Person 
constructor with the argument "Tree".

The new operator lets developers create an instance of a user-defined object type or of one of the built-in 
object types that has a constructor function.

When a function is called with the 'new' keyword, the function will be used as a constructor. 'new' will do the 
following things:
a)Creates a blank, plain JavaScript object. For convenience, let's call it newInstance.
b)Points newInstance's [[Prototype]] to the constructor function's prototype property, if the prototype is an 
Object. Otherwise, newInstance stays as a plain object with Object.prototype as its [[Prototype]].

*! What is the meaning of - Points newInstance's [[Prototype]] to the constructor function's prototype?
When a function is called with the new keyword, it creates a new object instance. This new object’s internal 
[[Prototype]] property is set to the constructor function’s prototype property. This means that the new object 
instance will have access to all the properties and methods defined on the constructor function’s prototype 
property through the prototype chain.
In other words, when you create a new object instance using the new keyword, it sets up an inheritance link 
between the new object instance and the constructor function’s prototype property. This allows the new object 
instance to inherit properties and methods from the constructor function’s prototype.

*! What is the meaning of newInstance stays as a plain object with Object.prototype as its [[Prototype]]?
If the constructor function’s prototype property is not an object, then the new object instance created by 
calling the constructor function with the new keyword will not have its internal [[Prototype]] property set to 
the constructor function’s prototype property. Instead, the new object instance will remain a plain object with 
its internal [[Prototype]] property set to Object.prototype.

This means that the new object instance will not inherit any properties or methods from the constructor 
function’s prototype property. Instead, it will only inherit properties and methods from Object.prototype, 
which is the default prototype for all objects in JavaScript.

*! How to understand if constructor function's prototype is an object or not an object ?
Ans)You can use the typeof operator to check if the constructor function’s prototype property is an object. 
If typeof ConstructorFunction.prototype returns "object", then the prototype property is an object. Here’s an 
example -
function MyConstructor() {}
console.log(typeof MyConstructor.prototype); // "object"
In this example, MyConstructor.prototype is an object, so typeof MyConstructor.prototype returns "object".

*! So all constructor's prototype is an object ? is there any constructor whose prototype is not an object ?
Ans)By default, all constructor functions have a prototype property that is an object. However, it is possible 
to manually set the prototype property of a constructor function to a non-object value. Here’s an example -
function MyConstructor() {}
MyConstructor.prototype = 3;
console.log(typeof MyConstructor.prototype); // "number"
In this example, we manually set the prototype property of the MyConstructor function to the value 3, which is a number. As a result, typeof MyConstructor.prototype returns "number".

It’s important to note that setting the prototype property of a constructor function to a non-object value can 
have unintended consequences. For example, if you create a new object instance using the new keyword and the 
constructor function with a non-object prototype property, the new object instance will not inherit any 
properties or methods from the constructor function’s prototype.
*/
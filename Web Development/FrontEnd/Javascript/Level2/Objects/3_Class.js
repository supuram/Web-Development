class Professor{
    name;
    teaches;
    constructor(name, teaches){
        this.name = name
        this.teaches = teaches
    }
    grade(paper){
        return paper
    }
}
const a = new Professor('Supratik', 'Physics')
console.log(a.name)
console.log(a.grade("Computer Science"))
console.log(a)

const prototype = Object.getPrototypeOf(a);
const methods = Object.getOwnPropertyNames(prototype).filter(
  (property) => typeof prototype[property] === "function"
);
console.log(methods);

/**
*! Here the object a points towards the class Professor. so it should have all the data and methods inside the 
*! class Professor. But when i do console.log(a) , why it only shows the data, i.e, only the name and teaches 
*! property of the class Professor?

Ans)When you log an object to the console using console.log(), it only shows the object’s own properties and 
their values. In the case of the a object, its own properties are name and teaches, which were set in the 
constructor method of the Professor class.

Methods, such as the grade method in the Professor class, are not own properties of the object instance. 
Instead, they are defined on the prototype property of the constructor function. When you create a new object 
instance using the new keyword and a constructor function, the new object instance inherits methods from the 
constructor function’s prototype property through the prototype chain.

In other words, the grade method is not an own property of the a object, but rather an inherited property that 
is defined on the Professor.prototype object. That’s why it doesn’t show up when you log the a object to the 
console using console.log(a).

Next, we use the Object.getPrototypeOf() function to get the prototype of the a object, which is 
Professor.prototype. We then use the Object.getOwnPropertyNames() function to get an array of all its own 
properties, including methods. We filter this array to only include properties that are functions (i.e., 
methods) using the Array.prototype.filter() method and a callback function that checks if each property is a 
function using the typeof operator.

Finally, we print this array of methods to the console using the console.log() function. This shows that the 
prototype of the a object has two methods: "constructor" and "grade".
*/
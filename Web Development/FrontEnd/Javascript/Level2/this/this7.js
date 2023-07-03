const person = {
    name: ["Bob", "Smith"],
    age: 32,
    bio() {
      console.log(`${this.name[0]} ${this.name[1]} is ${this.age} years old.`)
    },
    introduceSelf() {
      console.log(`Hi! I'm ${this.name[0]}.`)
    },
}
person.bio()
person.introduceSelf()

/**
In the given code, the keyword "this" is used to refer to the current object, which in this case is the 
"person" object. The "this" keyword allows you to access the properties and methods of the object within its 
own scope.

In the bio() method, this.name is used to access the "name" property of the current object, and this.age is 
used to access the "age" property. Similarly, in the introduceSelf() method, this.name is used to access the 
"name" property.

If you were to remove the "this" keyword and simply use name and age instead, the code would not work as 
intended. It would result in an error because the variables name and age would be treated as local variables 
within the methods, rather than accessing the properties of the object.

By using the "this" keyword, you explicitly refer to the properties of the current object, ensuring that the 
correct values are accessed and used within the methods.

*! Why variables name and age would be treated as local variables within the methods, rather than accessing 
*! the properties of the object ?
Ans)In JavaScript, when a variable is referenced without any explicit context, it is assumed to be a local 
variable within the current scope. In the context of a method, such as bio() or introduceSelf() in your 
example, the variables name and age would be considered local variables within the method's scope.

If you were to remove the "this" keyword and use name and age instead, JavaScript would interpret these 
references as attempts to access local variables named name and age within the method. Since these local 
variables are not defined within the method, you would encounter a ReferenceError, and the code would fail to 
work as intended.

To access the properties of an object from within its methods, you need to use the "this" keyword to explicitly 
refer to the object's properties. By using this.name and this.age, you ensure that you are accessing the 
properties defined within the object itself, rather than local variables within the method's scope.
*/
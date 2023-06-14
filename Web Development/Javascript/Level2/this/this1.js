console.log(this)
/*
In the global context (outside of any function), this refers to the global object. In a web browser, the global 
object is the window object, while in Node.js, it is the global object.
*/

const me = {
    a:"Ishita",
    b:"Sreyoshi",
    c:"Elephant",
    talk(){
        console.log(this)  // me becomes 'this' object inside talk() when we write me.talk() below. this = me{}
    }
}
me.talk()
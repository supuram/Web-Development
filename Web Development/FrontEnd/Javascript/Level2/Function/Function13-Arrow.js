function log(text) {
    console.log(`${text}: ${this.someValue}`);
}
  
const instance = {
    someValue: 'Instance',
    passArrow() {
      const callback = (text) => log.call(this, text);
  
      setTimeout(callback, 100, 'Arrow');
    },
    passFn() {
      const callback = function (text) {
        log.call(this, text);
      };
      setTimeout(callback, 200, 'Function');
    },
};
  
globalThis.someValue = 'Global';
instance.passArrow(); // Arrow: Instance
instance.passFn(); // Function: Global

/*
MDN: "Arrow functions establish this based on the scope the Arrow function is defined within."

In practical terms this means that when an arrow function is created inside an object method it automatically binds 
to the this of the object the method was called on, so it retains access to the original creating object even when 
it's passed as a callback to another function (or method of another object).

Regular functions do not behave this way. Regular functions have to be explicitly bound to the object.

As a trade off arrow functions don't support apply, bind, or call and as a consequence arrow functions cannot be 
shared via the prototypal inheritance mechanism (given that each arrow function's this is statically bound it no 
longer can be shared via a dynamically passed this).
*/
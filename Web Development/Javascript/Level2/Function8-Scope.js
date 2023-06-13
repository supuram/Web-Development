// The following variables are defined in the global scope
var num1 = 50;
var num2 = 41;
const namee = "Ishita";

// This function is defined in the global scope
function multiply() {
  return num1 * num2;
}

console.log(multiply()); // 60

// A nested function example
function getScore() {
  const num1 = 56;
  const num2 = 39;

  function add() {
    return `${namee} scored ${num1 + num2}`;
  }

  return add();
}

function getScore1()
{
    const namee1 = "Sreyoshi"
    function add(){
        //return `${namee1} scored ${window.num1 + window.num2}` // this can be used in browser environment
        return `${namee1} scored ${num1 + num2}`;
    }
    return add()
}

console.log(getScore1())
console.log(getScore()); // "Ishita scored 95"
// console.log(namee1)  // shows error

/*
Variables defined inside a function cannot be accessed from anywhere outside the function, because the variable 
is defined only in the scope of the function. However, a function can access all variables and functions defined 
inside the scope in which it is defined.

In other words, a function defined in the global scope can access all variables defined in the global scope. A 
function defined inside another function can also access all variables defined in its parent function, and any 
other variables to which the parent function has access.
*/
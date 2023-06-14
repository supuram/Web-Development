function myForEach(array, callback) {
    for (let i = 0; i < array.length; i++) {
        callback(array[i]); // This is when the callback function gets called, or executed, i.e this calls 
    }                       // the console.log(item + 2)
}
  
// You would call it like this:
const myArry = [2, 3, 4, 2];
myForEach(myArry, (item) => {
  console.log(item + 2); 
})


/*
Working of the code -
When myForEach(myArry, (item) => {...}) is called, the code inside the myForEach function is executed with myArry 
as the array argument and the anonymous arrow function as the callback argument.

The for loop inside the myForEach function iterates over each element in the myArry array. On each iteration of the 
loop, the callback function is called with the current element of the array as its argument. In this case, the 
callback function is the anonymous arrow function that was passed as the second argument to myForEach, so it logs 
the value of the current element plus 2 to the console.

So when myForEach(myArry, (item) => {...}) is called, it first executes the code inside the myForEach function, 
which in turn calls the anonymous arrow function on each iteration of the for loop and logs the value of each 
element in myArry plus 2 to the console.

In the code callback(array[i]), the callback function is called with the current element of the array as its 
argument. In the example code you provided earlier, the callback function is the anonymous arrow function that was 
passed as the second argument to the myForEach function.

This anonymous arrow function takes one argument, item, and logs item + 2 to the console. When the arrow function 
is called with an argument, that argument is assigned to the item parameter of the function. So when 
callback(array[i]) is executed, it is equivalent to calling the arrow function with array[i] as its argument. This 
assigns the value of array[i] to the item parameter of the arrow function and logs item + 2 to the console.

For example, on the first iteration of the for loop in the myForEach function, i is equal to 0, so array[i] is 
equal to 2 (the first element of myArry). When callback(array[i]) is executed, it is equivalent to calling the 
arrow function with 2 as its argument. This assigns 2 to the item parameter of the arrow function and logs item + 2, 
or 4, to the console.

So to answer your question, item is not a function; it is a parameter of the anonymous arrow function. When this 
arrow function is called with an argument, that argument is assigned to the item parameter and used in the 
calculation of item + 2
*/
// Callbacks are just functions passed into another function as arguments.
/*
When callback(array[i]) is executed, the callback function that was passed as the second argument to the myForEach 
function is called with the current element of the array as its argument.

In the example code you provided earlier, the callback function is an anonymous arrow function that takes one 
argument, item, and logs item + 2 to the console. So when callback(array[i]) is executed, it is equivalent to 
calling this arrow function with the current element of the array as its argument. This will log the value of the 
current element plus 2 to the console.

For example, on the first iteration of the for loop in the myForEach function, i is equal to 0, so array[i] is 
equal to 2 (the first element of myArry). When callback(array[i]) is executed, it is equivalent to calling the 
arrow function with 2 as its argument. This will log 2 + 2, or 4, to the console.
*/
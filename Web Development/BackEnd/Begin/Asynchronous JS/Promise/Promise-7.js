function delay(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
}
  
console.log("Start");
delay(2000)
    .then(() => {
      console.log("Delayed code executed after 2 seconds");
    })
    .catch((error) => {
      console.log("An error occurred:", error);
});

/**
*! So Promise1 is attached to the handler resolve which then executes setTimeout which again returns a Promise2
*! which is returned by the delay function. And this Promise2 is passed to then which then executes the console.log ?
Ans)The delay function returns a single promise (let’s call it Promise1) that is created using the Promise 
constructor. The Promise constructor takes in a function (the executor) with two arguments: resolve and reject. 
In this case, the executor function calls setTimeout with two arguments: the resolve function and the number of 
milliseconds to wait (ms).

setTimeout is a built-in JavaScript function that executes a specified function (in this case, resolve) after a 
specified delay (in this case, ms milliseconds). It does not return a promise.

*? After the specified delay, the resolve function is called, which changes the state of Promise1 from “pending” to 
*? “fulfilled” and triggers any attached then handlers. In this case, there is one then handler attached to Promise1, 
which logs "Delayed code executed after 2 seconds" to the console.

So, to summarize: the delay function returns a single promise (Promise1) that is resolved after a specified delay 
using setTimeout. When this promise is resolved, any attached then handlers are executed. In this case, there is 
one then handler that logs a message to the console.

*/
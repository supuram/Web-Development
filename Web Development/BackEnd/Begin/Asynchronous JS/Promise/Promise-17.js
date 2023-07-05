doSomething().then(function () {
    return doSomethingElse();
});
  
doSomething().then(function () {
    doSomethingElse();
});
  
doSomething().then(doSomethingElse());

doSomething().then(doSomethingElse);

/**
*! Q)What is the difference between these four promises?
Ans)The four code snippets you provided involve promises in JavaScript, but they have different behaviors and 
nuances. Let's break them down one by one - 

*! 1. `doSomething().then(function () { return doSomethingElse(); });`

In this snippet, the `doSomething()` function is called first, which returns a promise. The `then()` method is 
then called on that promise, and it takes a callback function as an argument. This callback function is executed 
when the promise returned by `doSomething()` is resolved. Inside the callback function, `doSomethingElse()` 
is called and returned, which creates another promise. The return value of this callback function becomes the 
fulfillment value of the promise returned by `then()`. Essentially, this snippet chains two promises together.

*! 2. `doSomething().then(function () { doSomethingElse(); });`

This code snippet is similar to the previous one, with the only difference being that the callback function 
inside `then()` does not have a return statement. When a function inside a `then()` callback doesn't explicitly 
return a value, the promise returned by `then()` will resolve with an undefined fulfillment value. So, the 
second promise created by `doSomethingElse()` in this snippet won't be chained to the first promise.

*! 3. `doSomething().then(doSomethingElse());`

In this snippet, the `doSomething()` function is called, and its return value (presumably a promise) is 
immediately passed as an argument to `then()`. However, the issue here is that `doSomethingElse()` is immediately 
executed instead of being passed as a callback function. This behavior is likely unintended, and it can cause 
problems if `doSomethingElse()` is not designed to be invoked immediately. It won't properly chain promises 
together.

*! 4. `doSomething().then(doSomethingElse);`

This code snippet is similar to the previous one, but the difference is that `doSomethingElse` is passed as a 
reference without parentheses. This means that `doSomethingElse` is passed as a callback function to the `then()`
method, rather than being invoked immediately. It properly chains the promises, and when the promise returned by 
`doSomething()` is resolved, it will invoke the `doSomethingElse` function.

In summary, the main differences lie in whether the functions are invoked immediately or passed as callback 
functions, and whether the promises are chained together properly. The first and fourth snippets correctly chain 
promises, while the second snippet does not chain the second promise, and the third snippet invokes the function 
immediately instead of passing it as a callback.
*/
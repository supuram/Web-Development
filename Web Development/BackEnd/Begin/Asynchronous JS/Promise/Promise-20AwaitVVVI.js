async function getUserData() {
    const response = await fetch('https://api.example.com/users/12345')
    const data = await response.json()
    return data
}

/**
*! Q)When you use await, the promise is resolved automatically ? That means the promise returned is automatically 
*! handed to the handlers in the .then function running in the background and is resolved ? Is this true ?

Ans)When you use `await` with a promise, the JavaScript engine automatically waits for the promise to resolve 
before continuing execution of the function. This means that you don't have to explicitly attach a `.then` method 
to the promise to handle its resolved value.

Instead, the value that the promise resolves with is returned by the `await` expression and can be assigned to a 
variable or used in any other way. For example, in the code snippet you provided earlier - 

async function getUserData() {
  const response = await fetch('https://api.example.com/users/12345')
  const data = await response.json()
  return data
}

The first `await` expression waits for the promise returned by `fetch` to resolve and assigns its resolved value 
(the HTTP response) to the `response` variable. The second `await` expression waits for the promise returned by 
`response.json()` to resolve and assigns its resolved value (the parsed JSON data) to the `data` variable.

So, in summary, when you use `await` with a promise, the JavaScript engine automatically waits for the promise to 
resolve and returns its resolved value, allowing you to write asynchronous code that looks similar to synchronous 
code.

*! Q)So the sentence i wrote about await is true ?
Ans)The statement you wrote about `await` is partially true. When you use `await` with a promise, the JavaScript 
engine does automatically wait for the promise to resolve before continuing execution of the function. However, 
there is no `.then` function running in the background.

Instead, the value that the promise resolves with is returned by the `await` expression and can be used directly 
in your code. You don't have to attach a `.then` method to the promise to handle its resolved value when using 
`await`.

*! Q).then() vs await
Ans)`await` and `.then` both provide a way to handle the resolved value of a promise, but they work in slightly 
different ways.

*? When you attach a `.then` method to a promise, you provide a callback function that will be called with the 
*? resolved value of the promise once it's resolved. The `.then` method returns a new promise that resolves with the 
*? value returned by the callback function.

*? On the other hand, when you use `await` with a promise, the JavaScript engine automatically waits for the promise 
*? to resolve and returns its resolved value. You can then use this value directly in your code without having to 
*? provide a callback function.

*? Under the hood, `await` and `.then` both rely on the same mechanism to handle the resolution of promises. When a 
*? promise is resolved, any attached `.then` methods or `await` expressions are notified and their associated 
*? callback functions or expressions are executed with the resolved value of the promise.

So, in summary, `await` and `.then` both provide a way to handle the resolved value of a promise, but they do so 
in slightly different ways. `await` allows you to write asynchronous code that looks similar to synchronous code 
by automatically waiting for promises to resolve and returning their resolved values, while `.then` requires you 
to provide a callback function that will be called with the resolved value of the promise.

*! Q)A Promise is resolved means the asynchronous function which returns the promise has returned some value which 
*! will be attached to the Promise object , right ?
*? Ans)Yes, that’s correct! When a promise is resolved, it means that the asynchronous operation it represents has 
*? completed successfully and produced a value. This value is then attached to the promise object and can be 
*? accessed by attaching a .then method to the promise or by using await with the promise.
*/
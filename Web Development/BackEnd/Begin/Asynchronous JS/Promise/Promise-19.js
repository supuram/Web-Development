/* Implement a retry mechanism using Promises. Create a function that takes a function and a maximum number of 
retries as arguments. The function should attempt to execute the provided function and, if it fails, retry a 
certain number of times before rejecting the promise. */

function retry(fn, retries) {
    return new Promise((resolve, reject) => {
      function attempt() {
        fn()
          .then(resolve => console.log(resolve))
          .catch(error => {
            if (retries === 0) {
              reject(error);
            } 
            else {
              retries--;
              attempt();
            }
          });
      }
      attempt();
    })
}
async function fn(){
    return add(3,7)
}
function add(a, b){
    return a + b
}
retry(fn,4).then(result => {
    console.log(result);
});

/*
The value 10 is only being logged once because the .then method inside the retry function is not actually logging 
the resolved value of the promise returned by fn. Instead, it’s logging the resolve function itself.
The .then method is attached to the promise returned by fn and a callback function is provided. However, the 
callback function takes a single argument named resolve, which shadows the resolve function that was defined 
earlier as an argument to the new Promise constructor.
As a result, when the callback function is called with the resolved value of the promise returned by fn, this value 
is assigned to the resolve parameter of the callback function, and not to the resolve function that was defined 
earlier. Then, when you call console.log(resolve) inside the callback function, you’re actually logging the resolve
function itself, not the resolved value of the promise.
*/
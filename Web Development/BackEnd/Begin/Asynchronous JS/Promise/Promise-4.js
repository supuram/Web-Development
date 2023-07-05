/*
The elegant feature of promises is that then() itself returns a promise, which will be completed with the result 
of the function passed to it. This means that we can (and certainly should) rewrite Promise-2.js like this -
*/

const fetchPromise = fetch(
    "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json"
);

fetchPromise
    .then((response) => response.json())
    .then((data) => {
      console.log(data[0].name);
});
console.log('Beginning.........') 

/*
Instead of calling the second then() inside the handler for the first then(), we can return the promise returned 
by json(), and call the second then() on that return value. This means that fetchPromise represents a Promise
which represents the completion of the operation fetch(). This fetchPromise object is now attched with a handler
inside then() which is then executed. But surprisingly, this handler just returns another Promise object 
represented by json() which is then attached with another handler inside the second then() and which is executed.
*/
/**
*! Basics of Promise
The Promise object represents the eventual completion (or failure) of an asynchronous operation and its resulting 
value.

With a promise-based API, the asynchronous function starts the operation and returns a Promise object. You can 
then attach handlers to this promise object, and these handlers will be executed when the operation has succeeded 
or failed.
*/

const fetchPromise = fetch(
    "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json"
  );
  
  console.log(fetchPromise, 'Hi I am Suppu');
  
  fetchPromise.then((response) => {
    console.log(`Received response: ${response.status}`);
});
  
console.log("Started request…");

/**
fetch() is an asynchronous function in JavaScript. It returns a Promise that resolves to the Response object 
representing the response to the request, whether it is successful or not. You can use .then() and .catch() 
methods to handle the resolved or rejected Promise, or you can use the async/await syntax to handle the response 
in a more synchronous-looking manner. 

*? response is the parameter of the arrow function passed as an argument to the .then() method. When the 
*? fetchPromise is resolved, this arrow function is called with the resolved value (in this case, the Response 
*? object) as its argument. The response parameter inside the arrow function refers to this resolved value.

*! What is the name of the handler function ?
Ans)The handler function is an anonymous arrow function. It doesn’t have a name because it is not assigned to a 
variable or given a name when it is defined. Instead, it is passed directly as an argument to the .then() method. 
Anonymous functions are often used as arguments to other functions or methods when you only need to use the 
function once and don’t need to reference it again later in your code.
*/
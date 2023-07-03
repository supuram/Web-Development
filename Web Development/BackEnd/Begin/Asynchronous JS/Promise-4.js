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
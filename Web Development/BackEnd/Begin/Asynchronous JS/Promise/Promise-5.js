/* https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Promises#using_the_fetch_api 
https://thenewtoys.dev/blog/2021/02/08/lets-talk-about-how-to-talk-about-promises/ */

const fetchPromise = fetch(
    "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json"
);
  
fetchPromise
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data[0].name);
});  
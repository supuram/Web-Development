const fetchPromise = fetch(
    "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json"
  );
  
  const jsonPromise = fetchPromise.then((response) => {
    return response.json();
  });
  
  jsonPromise.then((data) => {
    console.log(data[0].name);
});

/*
In this example, the first .then() method is called on fetchPromise and returns a new Promise, which is assigned 
to the jsonPromise variable. The second .then() method is then called on jsonPromise to access the parsed JSON 
data when the Promise is resolved. 
*/
const fetchPromise = fetch(
    "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json"
);
  
  fetchPromise.then((response) => {
    console.log('Asynchronous Operation is completed and returns Promise1 assigned to fetchPromise')
    const jsonPromise = response.json(); // response.json() returns another Promise
    jsonPromise.then((data) => {
        console.log('Asynchronous Operation response.json() is completed and returns Promise2 assigned to jsonPromise')
        console.log(data[0].name);
    });
});  
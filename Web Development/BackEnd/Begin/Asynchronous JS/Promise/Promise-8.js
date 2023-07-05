function fetchData() {
    return new Promise((resolve, reject) => {
      // Simulating an asynchronous API call
        setTimeout(() => {
            const data = { id: 1, name: "John Doe" };
            resolve(data);
            // reject("Failed to fetch data"); // Uncomment to simulate a rejection
        }, 2000);
    });
}
  
console.log("Start");
fetchData().then((data) => {
    console.log("Fetched data:", data);
}).catch((error) => {
    console.log("An error occurred:", error);
});

/**
*! resolve is a function that is passed as an argument to the executor function of a Promise. When called, it 
*! changes the state of the promise from “pending” to “fulfilled” and passes the value provided as its argument 
*! (in this case, data) to any attached then handlers.

In this example, fetchData() returns a promise that is resolved with the data object after 2 seconds (due to the 
use of setTimeout). When this promise is resolved, the attached then handler is called with the data object as its 
argument, and the data is logged to the console.
*/
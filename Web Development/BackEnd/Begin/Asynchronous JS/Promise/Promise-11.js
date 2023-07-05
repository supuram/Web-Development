// *! Q) Write a function that takes an array of URLs and returns a Promise that resolves with an array of the HTTP 
// *! response statuses for each URL.

function getURLStatuses(urls) {
    // Your code here
    return new Promise((resolve, reject) => {
        if(resolve){
            resolve(urls)
        }
        else{
            reject('fail')
        }
    })
}

// Example usage:
getURLStatuses(["https://example.com", "https://google.com"]).then((statuses) => {
    console.log(statuses); // Should output an array of response statuses
}).catch((error) => {
    console.log("An error occurred:", error);
});
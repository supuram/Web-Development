// *! Q) Create a function that accepts an array of values and returns a Promise that resolves with an array 
// *! containing only the unique values from the input array.

function getUniqueValues(array) {
    // Your code here
    return new Promise((resolve) => {
        const uniqueValues = [...new Set(array)];
        resolve(uniqueValues);
    })
}
  
// Example usage:
getUniqueValues([1, 2, 3, 2, 4, 5, 3, 1]).then((uniqueValues) => {
    console.log(uniqueValues); // Should output [1, 2, 3, 4, 5]
}).catch((error) => {
    console.log("An error occurred:", error);
});  
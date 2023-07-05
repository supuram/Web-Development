// *! Q) Write a function that accepts an array of Promises and returns a Promise that resolves with an array of 
// *! resolved values from the input Promises, in the same order.

async function resolveAll(promises) {
    // Your code here
    let resolvedValues = [];
    for (const promise of promises) {
        try {
            const value = await promise;
            resolvedValues.push(value);
        } catch (error) {
            // Ignore rejected promises
        }
    }
    return resolvedValues;
}
  
// Example usage:
const promises = [
    Promise.resolve(1),
    Promise.reject("Error"),
    Promise.resolve(3),
    Promise.resolve(4),
];
resolveAll(promises).then((resolvedValues) => {
    console.log(resolvedValues); // Should output [1, 3, 4]
}).catch((error) => {
    console.log("An error occurred:", error);
});  

/*
Inside an async function, you can use the await keyword before a call to a function that returns a promise. This 
makes the code wait at that point until the promise is settled, at which point the fulfilled value of the promise 
is treated as a return value, or the rejected value is thrown.
*/
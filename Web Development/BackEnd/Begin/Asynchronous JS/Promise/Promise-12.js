// *! Q) Implement a function that accepts a number and returns a Promise that resolves with the sum of all the 
// *! positive integers from 1 to the given number.

function sumPositiveIntegers(n) {
    // Your code here
    return new Promise((resolve) => {
        sum = 0
        for(let i = 1; i <= n; i++){
            sum = sum + i
        }
        if(resolve){
            resolve(sum)
        }
    })
}
  
// Example usage:
sumPositiveIntegers(5).then((result) => {
    console.log(result); // Should output 15 (1 + 2 + 3 + 4 + 5)
})
.catch((error) => {
    console.log("An error occurred:", error);
});
  
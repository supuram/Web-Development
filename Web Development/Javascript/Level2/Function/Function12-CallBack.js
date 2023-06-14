function myForEach(array, callback) {
    for (let i = 0; i < array.length; i++) {
        callback(array[i]); // This is when the callback function gets called, or executed
    }
}
  
// You would call it like this:
const myArry = [2, 3, 4, 2];
myForEach(myArry, function(item){
  console.log(item + 2); 
})

// In this version of the code, an anonymous function is passed as the second argument to the myForEach function
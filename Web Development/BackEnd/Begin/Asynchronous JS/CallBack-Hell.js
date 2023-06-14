function doStep1(init, callback) {
    const result = init + 1;
    callback(result);
}
  
function doStep2(init, callback) {
    const result = init + 2;
    callback(result);
}
  
function doStep3(init, callback) {
    const result = init + 3;
    callback(result);
}
  
function doOperation() {
    doStep1(0, (result1) => {
      doStep2(result1, (result2) => {
        doStep3(result2, (result3) => {
          console.log(`result: ${result3}`);
        });
      });
    });
}
  
doOperation();

/*
Because we have to call callbacks inside callbacks, we get a deeply nested doOperation() function, which is much 
harder to read and debug. This is sometimes called "callback hell" or the "pyramid of doom" (because the indentation
looks like a pyramid on its side).

When we nest callbacks like this, it can also get very hard to handle errors: often you have to handle errors at 
each level of the "pyramid", instead of having error handling only once at the top level.

For these reasons, most modern asynchronous APIs don't use callbacks. Instead, the foundation of asynchronous 
programming in JavaScript is the Promise, and that's the subject of the next article.
*/
  
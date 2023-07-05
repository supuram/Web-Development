somePromise().then(function () {
    someOtherPromise();
}).then(function () {
    // Gee, I hope someOtherPromise() has resolved!
    // Spoiler alert: it hasn't.
});
/**
*! Q)What is wrong with this code ? 
*? Ans)The issue with this code is that the second `.then()` block does not wait for the resolution of 
*? `someOtherPromise()`. It assumes that `someOtherPromise()` has already resolved, but in reality, it may still 
*? be pending or executing asynchronously.

Here's an explanation of the code flow:

1. The `somePromise()` function is called, and when it resolves, the first `.then()` block is executed.

2. Inside the first `.then()` block, `someOtherPromise()` is called. However, since it is not chained to the 
promise chain, it will start executing independently and will not affect the subsequent `.then()` block.

3. The second `.then()` block is executed immediately after the first `.then()` block, without waiting for 
`someOtherPromise()` to resolve. This means that the code inside the second `.then()` block assumes that 
`someOtherPromise()` has already resolved, which may not be the case.

To fix this code and ensure that the second `.then()` block waits for the resolution of `someOtherPromise()`, 
you need to chain it properly. Here's an updated version -

somePromise().then(function () {
  return someOtherPromise();
}).then(function () {
  /Now the code inside this block will execute after someOtherPromise() has resolved.
}).catch(function (error) {
  /Handle any errors that occurred in either somePromise() or someOtherPromise().
});

In the updated code:

1. The first `.then()` block returns the `someOtherPromise()` instead of directly invoking it. This properly 
chains the promises together.

2. By returning `someOtherPromise()`, the subsequent `.then()` block will wait for it to resolve before executing 
its code.

3. The `.catch()` block is included to handle any errors that may occur in either `somePromise()` or 
`someOtherPromise()`.

With these changes, the second `.then()` block will execute only after `someOtherPromise()` has resolved, 
ensuring the desired behavior.
*/
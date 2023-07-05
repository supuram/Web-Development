function performTask(task) {
    return new Promise((resolve, reject) => {
      // Simulating a task
      setTimeout(() => {
        if (task === "success") {
          resolve("Task completed successfully");
        } else {
          reject("Task failed");
        }
      }, 2000);
    });
}
  
console.log("Start");
performTask("success").then((result) => {
    console.log(result);
    return performTask("failure");
}).then((result) => {
    console.log(result);
})

/*
The code you provided logs "Start" to the console, then calls the performTask function with an argument of 
"success". This returns a promise that is resolved after 2 seconds with the value "Task completed successfully". 
The first then function attached to this promise logs this value to the console.

The first then function also returns another call to performTask, this time with an argument of "failure". This 
returns another promise that is rejected after 2 seconds with the reason "Task failed". However, there is no catch 
function attached to this second promise to handle the rejection, so an UnhandledPromiseRejection error is thrown, 
indicating that a promise was rejected but no catch handler was provided to handle the rejection.
*/
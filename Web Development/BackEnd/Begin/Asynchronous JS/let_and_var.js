for(var i=0;i<3;i++){
    setTimeout(()=>{
        console.log(i, 'var')
    },100)
}
console.log("----------------------------------------------------------------------------------------")
for(let i=0;i<3;i++){
    setTimeout(()=>{
        console.log(i, 'let')
    },1000)
}
/*
The output of the code you provided is 0, 1, 2 because the variable i is declared with the let keyword, which means 
it has block scope. This means that a new i variable is created for each iteration of the for loop.

When the for loop runs, it creates a new block scope for each iteration. Within each block scope, a new i variable 
is created and initialized to the current value of the loop counter. The anonymous function passed to setTimeout is
also defined within this block scope, so it has access to the i variable that was created for that specific 
iteration of the loop.

Since each iteration of the loop has its own i variable, each anonymous function passed to setTimeout logs a 
different value of i. The first function logs 0, the second logs 1, and the third logs 2.
*/
console.log("----------------------------------------------------------------------------------------")
/*
The output of the code you provided is 3, 3, 3 because of the way JavaScript handles closures and the 
scope of variables. In this case, the variable i is declared with the var keyword, which means it has 
function scope. This means that there is only one i variable that is shared among all three of the 
anonymous functions passed to setTimeout.

When the for loop runs, it increments the value of i until it reaches 3, at which point the loop exits. 
However, the anonymous functions passed to setTimeout do not execute immediately; they are scheduled to 
run after a delay of 100 milliseconds. By the time these functions execute, the for loop has already 
completed and the value of i is 3. As a result, all three of the anonymous functions log the value of i 
as 3.

If you want each function to log a different value of i, you can use an immediately-invoked function 
expression (IIFE) to create a new closure for each iteration of the loop. Here’s an example:
*/
for (var i = 0; i < 3; i++) {
    (function(j) {
        setTimeout(() => {
            console.log(j, 'var');
        }, 100);
    })(i);
}
/*
In this version of the code, we pass the current value of i as an argument to an IIFE. Inside the IIFE, we have a 
new variable j that takes on the value of i for each iteration of the loop. Since each IIFE creates a new closure, 
each anonymous function passed to setTimeout has its own unique value of j, and so they log different values.
*/
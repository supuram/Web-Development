for(var i=0;i<3;i++){
    setTimeout(()=>{
        console.log(i, 'var')
    },100)
}
console.log("----------------------------------------------------------------------------------------")
for(let i=0;i<3;i++){
    setTimeout(()=>{
        console.log(i, 'let')
    },100)
}
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
const a = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
   });
   
let arr = [];
   
function askQuestion(i) 
{
    if (i < 5) {
        a.question(`Enter your ${(i+1)}th number = `, num => {
            arr.push(Number.parseInt(num)); // without parseInt num will be string type
            askQuestion(i + 1);
      });
    } 
    else {
      a.close();
      console.log(typeof(arr[0]))
      console.log(arr)
    }
}
askQuestion(0);

/*
If you add console.log(arr) after askQuestion(0), the array will not be printed because the question method of the
readline interface is asynchronous. This means that the console.log(arr) line will be executed before all the 
questions have been asked and answered, and before the arr array has been fully populated.
*/
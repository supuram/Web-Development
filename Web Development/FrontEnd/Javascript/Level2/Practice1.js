// Keep adding number to the array until 0 is added

const a = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
   
let arr = [];
   
function askQuestion() 
{
    a.question('Enter a number (enter 0 to stop): ', num => {
        if (num === '0') {
            console.log(arr);
            a.close();
        } 
        else {
            arr.push(num);
            askQuestion();
        }
    });
}
   
askQuestion();
   
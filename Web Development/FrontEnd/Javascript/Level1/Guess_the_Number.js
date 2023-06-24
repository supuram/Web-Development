let min = 1; // The minimum value (inclusive)
let max = 10; 
let randomNumber = Math.floor(Math.random() * (max - min)) + min;

const a = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
   
let ct = 0
   
function askQuestion() 
{
    a.question('Enter a number = ', num => {
        if (Number.parseInt(num) == randomNumber) {
            console.log(num, 100 - ct);
            a.close();
        } 
        else {
            ct ++;
            askQuestion();
        }
    });
}
   
askQuestion();
   
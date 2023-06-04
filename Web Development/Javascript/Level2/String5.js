let min = 1; 
let max = 7;
let randomNumber = (Math.floor(Math.random() * (max - min)) + min).toString();
console.log(typeof(randomNumber))
console.log("Dice"+randomNumber)
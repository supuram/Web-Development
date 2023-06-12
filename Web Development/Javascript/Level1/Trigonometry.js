let a = Math.sin(90)
console.log(a,Math.PI)
/*
The Math.sin() function in JavaScript takes an angle in radians as its argument, not degrees. So, when you pass 
90 to the Math.sin() function, it’s actually treating it as 90 radians, not 90 degrees
*/

//Degrees to Radians
let angleInDegrees = 90;
let angleInRadians = angleInDegrees * Math.PI / 180;
let result = Math.sin(angleInRadians);
console.log(result, angleInRadians); // 1

// Radians to Degrees
angleInRadians = Math.PI / 4;
angleInDegrees = angleInRadians * 180 / Math.PI;
console.log(angleInDegrees); // 45

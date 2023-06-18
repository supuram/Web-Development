// var generateName = require('sillyname'); if no import statement then write this line
import generateName from "sillyname";
var sillyName = generateName();
console.log(sillyName)

/*
You can only use import when you have modified the package.json file, where below the "main": "first.js" you have 
to write "type": "module"
*/
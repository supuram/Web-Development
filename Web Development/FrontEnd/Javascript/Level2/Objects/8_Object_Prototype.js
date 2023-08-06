let obj = {
    Abhinava : 72,
    Ishita : 89,
    Sushmita : 96,
    Priyajit : 67
}

let str = Object.prototype.toString.call(obj)
console.log(str)

var objectRegExp = /^\[object\s(.*)\]$/;
var match = objectRegExp.exec(str);
if (match) {
    var type = match[1];
    console.log(type); // "Object"
}
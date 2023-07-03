const myObject = {
    a: 1,
    b: 2,
    c: 3
};
let prototype = Object.getPrototypeOf(myObject);
  
while (prototype) {
    console.log(prototype);
    prototype = Object.getPrototypeOf(prototype);
}
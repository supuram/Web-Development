function map(f, a) {
    const result = new Array(a.length);
    for (let i = 0; i < a.length; i++) {
        result[i] = f(a[i]);
    }
    return result;
}
  
const cube = function (x) {
    return x * x * x;
};
  
const numbers = [0, 1, 2, 5, 10];
console.log(map(cube, numbers)); // [0, 1, 8, 125, 1000]

/*
In the following code, the function receives a function defined by a function expression and executes it for 
every element of the array received as a second argument
*/
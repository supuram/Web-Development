function addSquares(a, b) {
    function square(x) {
      return x * x;
    }
    return square(a) + square(b);
}
  
console.log(addSquares(2, 3)); // 13
console.log(addSquares(3, 4)); // 25
console.log(addSquares(4, 5)); // 41

/*
The inner function forms a closure: the inner function can use the arguments and variables of the outer function, 
while the outer function cannot use the arguments and variables of the inner function.
*/
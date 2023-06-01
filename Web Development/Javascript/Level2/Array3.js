let a = [61,92,23,43,57]
let b = a.join("-")
console.log(b, typeof(b), typeof(a))
console.log(a.pop())  // prints and deletes the last element in the array
console.log("After pop array is",a)
console.log("Push returns the length of the array",a.push('Good'))  // adds an elemnt at the end of the array and returns length of the array
console.log("After push array is",a)
console.log("Shift removes first element in an array", a.shift())
console.log("Array after shift is",a)
console.log("Unshift adds element at the beginning of the array and returns length",a.unshift('Good boy'))
console.log("Array after unshift is",a)
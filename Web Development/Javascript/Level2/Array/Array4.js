let a = [21,35,98,677,43,6,1003]
let b = a.sort()  // sorts alphabetically and modifies the array
console.log("Sorted array is",b,a)
delete a[3]
console.log(a.length, a)
let arr = [45,23,21]
// map creates a new array by performing some operation on each array element

let a = arr.map((value, indx, array) => {
    console.log(value, indx, array)
    return value * value * 3
})
console.log(a)
console.log(arr)
let arr = [2,4,8]
let a = arr.reduce((h1,h2) => {
    return h1 + h2
})
console.log(a)  

/*
In the first step h1 is 2 and h2 is 4. It does 2 + 4 = 6
In the second step h1 is 6 and h2 is 8. It does 6 + 8 = 14
*/

a = arr.reduce((h1,h2) => {
    return h1 - h2
})
console.log(a)

a = arr.reduce((h1,h2) => {
    return h1 * h2
})
console.log(a)

a = arr.reduce((h1,h2) => {
    return h1 / h2
})
console.log(a)
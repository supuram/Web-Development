let str1 = "The quick brown fox"
let str2 = "dog"
console.log(str1.includes(str2))
console.log(str1.startsWith('T'))
console.log(str1.startsWith('The'))

const str = "To be, or not to be, that is the question";
console.log(str.startsWith("not to be", 10)) 

/*  The second parameter is the position in the string at which to begin searching for the specified value.
In this case, it checks if the string str starts with "not to be" at position 10. The result is true */
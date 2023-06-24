/* Arrays are mutable and can be changed. In Javascript arrays are objects. The type of operator on 
arrays returns objects */

let a = [1,2,'a','hi',true]
console.log(a[3])
console.log(a)
console.log(a.length)
a[1] = 29
a[5] = "Its raining heavily"
console.log("length of",a,"is",a.length)
console.log(typeof(a))
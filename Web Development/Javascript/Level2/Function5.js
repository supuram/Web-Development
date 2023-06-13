function myFunc(theObject){
    theObject.make = "Toyota";
}
  
const mycar = {
    make: "Honda",
    model: "Accord",
    year: 1998,
};
  
console.log(mycar.make); // "Honda"
myFunc(mycar);
console.log(mycar.make); // "Toyota"

/*
When you pass an object as a parameter, if the function changes the object's properties, that change is visible 
outside the function
*/

function myFunc(theArr) {
    theArr[0] = 30;
}
  
const arr = [45];
  
console.log(arr[0]); // 45
myFunc(arr);
console.log(arr[0]); // 30

/*
When you pass an array as a parameter, if the function changes any of the array's values, that change is visible 
outside the function
*/
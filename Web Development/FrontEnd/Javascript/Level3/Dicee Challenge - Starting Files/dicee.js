let min = 1; 
let max = 7;
let randomNumber = (Math.floor(Math.random() * (max - min)) + min).toString();

let str = "images/" + "dice" + randomNumber + ".png"
document.getElementsByClassName("img1")[0].setAttribute("src",str) // Statement 1
//document.querySelectorAll("img")[0].setAttribute("src",str)      // Statement 2

/*
Both Statement 1 and Statement 2 works.
The getElementsByClassName method returns an HTMLCollection of elements with the specified class name. An 
HTMLCollection is an array-like object, so you need to access the specific element you want to modify using an 
index, just like you would with an array.
 */

let min1 = 1; 
let max1 = 7;
let randomNumber1 = (Math.floor(Math.random() * (max1 - min1)) + min1).toString();

let str1 = "images/" + "dice" + randomNumber1 + ".png"
document.querySelectorAll("img")[1].setAttribute("src",str1)

if(randomNumber > randomNumber1){
    document.querySelector("h1").innerHTML = "Player 1 Wins"
}
else if(randomNumber < randomNumber1){
    document.querySelector("h1").innerHTML = "Player 2 Wins"
}
else{
    document.querySelector("h1").innerHTML = "Draw"
}
let min = 1 
let max = 7

let buttonRed = document.querySelector('.button-red')
let ctRed = 0
let gridChild1 = document.querySelectorAll('.grid-child1')
let arrgridChild1 = []
for(let i = 0; i < gridChild1.length; i++){
    arrgridChild1[i] = gridChild1[i].getBoundingClientRect()
}

let gridChild = document.querySelectorAll('.grid-child')
let arrgridChild = []
for(let i = 0; i < gridChild.length; i++){
    arrgridChild[i] = gridChild[i].getBoundingClientRect()
}

for(let i=0;i<gridChild.length;i++){
    //console.log(arrgridChild[i].left,arrgridChild[i].top)
    console.log(arrgridChild1[i].left,arrgridChild1[i].top)
    gridChild1[i].textContent = i
}
buttonRed.addEventListener('click', () => {
    let randomNumber = (Math.floor(Math.random() * (max - min)) + min).toString()
    let str = "images/" + "dice" + randomNumber + ".png"
    let image = document.querySelector('img')
    image.setAttribute("src",str)
    let redChildCircle = document.querySelectorAll('.red-child-circle')
    console.log(arrgridChild[0].left, arrgridChild[0].top)

    redChildCircle[0].style.transform = `translate(${arrgridChild1[1].left}px, ${arrgridChild1[1].top}px)`
})
/*
The translate function moves an element relative to its current position. The values passed to the translate 
function represent the amount of movement along the x and y axes, not the absolute position of the element.

In your code, you are passing the values of arrgridChild1[1].left and arrgridChild1[1].top to the translate function. 
These values represent the absolute position of an element relative to the viewport, not the amount of movement 
relative to the element’s current position.

To move the redChildCircle[0] element to the position of the gridChild1[1] element, you need to calculate the 
difference between their positions and pass those values to the translate function. Here’s an example of how you 
can do this - 
let redChildCircle = document.querySelectorAll('.red-child-circle');
let redChildCircleRect = redChildCircle[0].getBoundingClientRect();
let gridChild1Rect = gridChild1[1].getBoundingClientRect();

let deltaX = gridChild1Rect.left - redChildCircleRect.left;
let deltaY = gridChild1Rect.top - redChildCircleRect.top;

redChildCircle[0].style.transform = `translate(${deltaX}px, ${deltaY}px)`;

*/


document.body.style.overflow = 'hidden';
let min = 0; 
let max = 200; 

const element = document.querySelector('img')
let positionX = 0
let positionY = 0
setInterval(() => {
    let X_randomNumber = Math.floor(Math.random() * (max - min)) + min;
    let Y_randomNumber = Math.floor(Math.random() * (max - min)) + min;

    positionX += X_randomNumber;
    positionY += Y_randomNumber;
    element.style.left = positionX + 'px';
    element.style.top = positionY + 'px'
    if (positionX >= document.documentElement.clientWidth - element.offsetWidth) {
        positionX = Math.floor(Math.random() * (max - min)) + min;
    }
    if (positionY >= document.documentElement.clientHeight - element.offsetHeight) {
        positionY = Math.floor(Math.random() * (max - min)) + min;
    }
}, 50);
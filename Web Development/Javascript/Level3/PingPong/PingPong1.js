document.body.style.overflow = 'hidden';
let min = 0; 
let max = 50; 

const element = document.querySelectorAll('img')
let positionX = [0, 0, 0, 0]
let positionY = [0, 0, 0, 0]
let velocityX = [0, 0, 0, 0]
let velocityY = [0, 0, 0, 0]
let accelerationX = [0, 0, 0, 0]
let accelerationY = [0, 0, 0, 0]
setInterval(() => {
    for(let i = 0; i < 4; i++){
        let X_randomNumber = Math.floor(Math.random() * (max - min)) + min;
        let Y_randomNumber = Math.floor(Math.random() * (max - min)) + min;
        let oldVelocityX = velocityX[i]
        let oldVelocityY = velocityY[i]
        positionX[i] += velocityX[i] * X_randomNumber
        positionY[i] += velocityY[i] * Y_randomNumber
        velocityX[i] = X_randomNumber / 20;
        velocityY[i] = Y_randomNumber / 20;
        accelerationX[i] = (velocityX[i] - oldVelocityX) / 20;
        accelerationY[i] = (velocityY[i] - oldVelocityY) / 20;

        element[i].style.left = positionX[i] + 'px';
        element[i].style.top = positionY[i] + 'px'
        if (positionX[i] >= document.documentElement.clientWidth - element.offsetWidth || positionX[i] <= 0) {
            velocityX[i] *= -1;        
        }
        if (positionY[i] >= document.documentElement.clientHeight - element.offsetHeight || positionY[i] <= 0) {
            velocityY[i] *= -1;        
        }
    }
}, 50);
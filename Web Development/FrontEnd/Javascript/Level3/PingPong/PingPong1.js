//document.body.style.overflow = 'hidden';
let min = 0; 
let max = 50; 

const element = document.querySelectorAll('.ball')
const container = document.querySelector('.container')
let positionX = [0, 0, 0, 0]
let positionY = [0, 0, 0, 0]
let velocityX = [0, 0, 0, 0]
let velocityY = [0, 0, 0, 0]
let accelerationX = [0, 0, 0, 0]
let accelerationY = [0, 0, 0, 0]
setInterval(() => {
    for(let i = 0; i < 4; i++){
        let X_randomNumber = Math.floor(Math.random() * (max - min)) + min
        let Y_randomNumber = Math.floor(Math.random() * (max - min)) + min
        let oldVelocityX = velocityX[i]
        let oldVelocityY = velocityY[i]
        positionX[i] +=  X_randomNumber * velocityX[i]
        positionY[i] +=  Y_randomNumber * velocityY[i]
        
        velocityX[i] = X_randomNumber / 20
        velocityY[i] = Y_randomNumber / 20
        accelerationX[i] = (velocityX[i] - oldVelocityX) / 20
        accelerationY[i] = (velocityY[i] - oldVelocityY) / 20
        if (positionX[i] >= container.clientWidth - element[i].offsetWidth) {
            positionX[i] = 0
        }
        if (positionY[i] >= container.clientHeight - element[i].offsetHeight) {
            positionY[i] = 0       
        }
        
        element[i].style.left = positionX[i] + 'px'
        element[i].style.top = positionY[i] + 'px'
    }
}, 100)
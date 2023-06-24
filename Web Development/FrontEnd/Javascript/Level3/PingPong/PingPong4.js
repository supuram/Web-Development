const ball = document.querySelector('.ball');
const container = document.querySelector('.container');
const g = 9.8; // acceleration due to gravity
const v = 50; // initial velocity
const theta = Math.PI / 4; // angle of projection
const originX = container.clientWidth - ball.clientWidth - 400; // initial x position of the ball
const originY = container.clientHeight - ball.clientHeight - 200; // initial y position of the ball
console.log(originX, container.clientWidth, ball.clientWidth)
console.log(originY, container.clientHeight, ball.clientHeight)
let t = 0; // time

// update the position of the ball at regular intervals
const interval = setInterval(() => {
    // calculate the new x and y positions of the ball
    const x = (v * t * Math.cos(theta)) + originX;
    const y = (v * t * Math.sin(theta) - 0.5 * g * t * t) + originY;

    // update the position of the ball
    ball.style.left = `${x}px`
    ball.style.bottom = `${y}px`

    // increment time
    t += 0.1;

     // reset the position of the ball if it goes out of the container
     if (x > container.clientWidth || y < 0) {
        t = 0;
        ball.style.left = `${originX}px`;
        ball.style.bottom = `${originY}px`;
    }
}, 10);

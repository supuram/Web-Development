let min = 0; 
let max = 50; 

const ball = document.querySelector('.ball')
const container = document.querySelector('.container')

let leftright = Math.floor(Math.random() * (max - min)) + min
let right = leftright ? true : false
let updown = Math.floor(Math.random() * (20 - min)) + min
let up = updown ? true : false

velocityX = 3


setInterval(() => {
    let ballBounds = ball.getBoundingClientRect()
    let containerBounds = container.getBoundingClientRect()

    let ballBoundsLeft = parseInt(ballBounds.left)
    let ballBoundsRight = parseInt(ballBounds.right)
    let ballBoundsTop = parseInt(ballBounds.top)
    let ballBoundsBottom = parseInt(ballBounds.bottom)

    let ballTop = Math.floor(parseInt(window.getComputedStyle(ball).getPropertyValue("top")))
    let ballLeft = Math.floor(parseInt(window.getComputedStyle(ball).getPropertyValue("left")))
    /**
    In this case, parseInt() is used to parse the value returned by window.getComputedStyle(ball).getPropertyValue
    ("top"), which is a string representing the value of the top property of the computed style of the ball 
    element. The parseInt() function converts this string value to an integer.
     */
    console.log(ballTop,ballLeft)

    if(right && up){
        ball.style.top = ballTop - velocityX + 'px'  // ball.style.top = 2px means the ball moves 2px from the top
        ball.style.left = ballLeft + velocityX + 'px'  // ball moves away from the left
    }
    if(!right && up){
        ball.style.top = ballTop - velocityX + 'px'    // ball moves towards the top
        ball.style.left = ballLeft - velocityX + 'px'  // ball moves towards the left
    }
    if(right && !up){
        ball.style.top = ballTop + velocityX + 'px'    // ball moves away from the top, i.e, moves towards bottom
        ball.style.left = ballLeft + velocityX + 'px'  // ball moves away from the left
    }
    if(!right && !up){
        ball.style.top = ballTop + velocityX + 'px'    // ball moves away from the top
        ball.style.left = ballLeft - velocityX + 'px'  // ball moves towards the left
    }

    if(ballBoundsTop <= containerBounds.top){
        leftright = Math.floor(Math.random() * (max - min)) + min
        right = leftright ? true : false
        up = false
    }

    if(ballBoundsBottom >= containerBounds.bottom){
        leftright = Math.floor(Math.random() * (max - min)) + min
        right = leftright ? true : false
        up = true
    }

    if(ballBoundsRight >= containerBounds.right){
        right = false
        let updown = Math.floor(Math.random() * (max - min)) + min
        up = updown ? true : false
    }
    
    if(ballBoundsLeft <= containerBounds.left){
        right = true
        let updown = Math.floor(Math.random() * (max - min)) + min
        up = updown ? true : false
    }
},1)
let min = [0, 0, 0, 0]
let max = [10, 10, 10, 10]

let ball = document.querySelectorAll('.ball')
let container = document.querySelector('.container')

let right = []
let up = []
for (let i = 0; i < ball.length; i++) {
    let leftright = Math.floor(Math.random() * (max[i] - min[i])) + min[i]
    right.push(leftright ? true : false)
    let updown = Math.floor(Math.random() * (20 - min[i])) + min[i]
    up.push(updown ? true : false)
}
let velocityX = 3

setInterval(() => {
    for (let i = 0; i < ball.length; i++) {
        let ballBounds = ball[i].getBoundingClientRect()
        let containerBounds = container.getBoundingClientRect()

        let ballBoundsLeft = parseInt(ballBounds.left)
        let ballBoundsRight = parseInt(ballBounds.right)
        let ballBoundsTop = parseInt(ballBounds.top)
        let ballBoundsBottom = parseInt(ballBounds.bottom)

        let ballTop = Math.floor(parseInt(window.getComputedStyle(ball[i]).getPropertyValue("top")))
        let ballLeft = Math.floor(parseInt(window.getComputedStyle(ball[i]).getPropertyValue("left")))

        console.log(ballTop, ballLeft)

        if (right[i] && up[i]) {
            ball[i].style.top = ballTop - velocityX + 'px'
            ball[i].style.left = ballLeft + velocityX + 'px'
        }
        if (!right[i] && up[i]) {
            ball[i].style.top = ballTop - velocityX + 'px'
            ball[i].style.left = ballLeft - velocityX + 'px'
        }
        if (right[i] && !up[i]) {
            ball[i].style.top = ballTop + velocityX + 'px'
            ball[i].style.left = ballLeft + velocityX + 'px'
        }
        if (!right[i] && !up[i]) {
            ball[i].style.top = ballTop + velocityX + 'px'
            ball[i].style.left = ballLeft - velocityX + 'px'
        }

        if (ballBoundsTop <= containerBounds.top) {
            right[i] = Math.random() < 0.5
            up[i] = false
        }

        if (ballBoundsBottom >= containerBounds.bottom) {
            right[i] = Math.random() < 0.5
            up[i] = true
        }

        if (ballBoundsRight >= containerBounds.right) {
            right[i] = false
            up[i] = Math.random() < 0.5
        }

        if (ballBoundsLeft <= containerBounds.left) {
            right[i] = true
            up[i] = Math.random() < 0.5
        }
    }
}, 1)

/*
The purpose of defining right[i] = Math.random() < 0.5 and up[i] = Math.random() < 0.5 is to randomly change the
direction of each ball when it hits one of the walls of the container.

Math.random() generates a random number between 0 and 1. The expression Math.random() < 0.5 returns true with a 
probability of 0.5 and false with a probability of 0.5. This means that when a ball hits one of the walls of the 
container, there is a 50% chance that its direction will change.

For example, when a ball hits the top wall of the container, the code sets up[i] = false to make the ball move 
downwards. At the same time, the code sets right[i] = Math.random() < 0.5 to randomly change the horizontal 
direction of the ball. This means that there is a 50% chance that the ball will start moving to the right and a 
50% chance that it will start moving to the left.
*/
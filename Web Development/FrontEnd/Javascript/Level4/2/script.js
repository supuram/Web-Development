// https://www.youtube.com/watch?v=GFO_txvwK_c&t=201s
const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
const CANVAS_WIDTH = canvas.width = 600
const CANVAS_HEIGHT = canvas.height = 600
const playerImage = new Image()
playerImage.src = 'shadow_dog.png'
const spriteWidth = 575
const spriteHeight = 523
let frameX = 0
let frameY = 0
let gameFrame = 0
const staggerFrames = 5

function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    // ctx.fillRect(0, 0, 0, 0)
    // ctx.drawImage(playerImage, sx, sy, sw, sh, dx, dy, dw, dh) // s = source, d = destination
    // ctx.drawImage(playerImage, sx, sy, sw, sh, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    ctx.drawImage(playerImage, frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight)
    /* 0, 0, 200, 200 means we are cutting out 200 X 200 square from the top left corner (0, 0) of the original
    sprite sheet */
    if(gameFrame % staggerFrames == 0){
        if(frameX < 6){
            frameX++
        }
        else{
            frameX = 0
        }
    }
    
    gameFrame++
    requestAnimationFrame(animate)
}
animate()
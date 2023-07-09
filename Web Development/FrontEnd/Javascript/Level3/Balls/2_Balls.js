//  https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_building_practice

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const input = document.querySelector('input')
console.log(input.value)

let width = canvas.width = 950
let height = canvas.height = 500

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  function randomRGB() {
    return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

class Ball {
    constructor(x, y, velX, velY, color, size) {
      this.x = x;
      this.y = y;
      this.velX = velX;
      this.velY = velY;
      this.color = color;
      this.size = size;
    }
    draw(){
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
    }  
    update() {
        if ((this.x + this.size) >= width) {
          this.velX = -(this.velX);
        }
      
        if ((this.x - this.size) <= 0) {
          this.velX = -(this.velX);
        }
      
        if ((this.y + this.size) >= height) {
          this.velY = -(this.velY);
        }
      
        if ((this.y - this.size) <= 0) {
          this.velY = -(this.velY);
        }
      
        this.x += this.velX;
        this.y += this.velY;
      }           
}

input.addEventListener('input', () => {
    const newWidth = input.value;
    const widthRatio = newWidth / width;
    const newHeight = height * widthRatio;
  
    for (const ball of balls) {
      ball.x *= widthRatio;
      ball.y *= widthRatio;
      ball.velX *= widthRatio;
      ball.velY *= widthRatio;
  
      if (ball.x + ball.size > newWidth) {
        ball.x = newWidth - ball.size;
        ball.velX = -ball.velX;
      }
  
      if (ball.y + ball.size > newHeight) {
        ball.y = newHeight - ball.size;
        ball.velY = -ball.velY;
      }
    }
  
    width = canvas.width = newWidth;
    height = canvas.height = newHeight;
});  

let balls = []; 

while (balls.length < 25) {
    const size = random(10, 20);
    const ball = new Ball(
        random(0 + size, width - size),
        random(0 + size, height - size),
        random(-7, 7),
        random(-7, 7),
        randomRGB(),
        size
    );
    balls.push(ball);
}

function loop() {
    ctx.fillStyle = "rgba(0, 0, 0)";
    ctx.fillRect(0, 0, width, height);
  
    for (const ball of balls) {
      ball.draw();
      ball.update();
    }
  
    requestAnimationFrame(loop);
}
loop()
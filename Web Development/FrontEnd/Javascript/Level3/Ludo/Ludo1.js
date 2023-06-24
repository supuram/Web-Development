let min = 1 
let max = 7

let buttonRed = document.querySelector('.button-red')

// getting the position of grid and grid1
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
    gridChild[i].textContent = i
}

// moving the red buttons
let ctRed = 0
let redChildCircle = document.querySelectorAll('.red-child-circle')

redChild = []
redMove = [false, false, false, false]

redChild[0] = redChildCircle[0].getBoundingClientRect()
redChild[1] = redChildCircle[1].getBoundingClientRect()
redChild[2] = redChildCircle[2].getBoundingClientRect()
redChild[3] = redChildCircle[3].getBoundingClientRect()
buttonRed.addEventListener('click', () => {
    let randomNumber = (Math.floor(Math.random() * (max - min)) + min).toString()
    let str = "images/" + "dice" + randomNumber + ".png"
    let image = document.querySelector('img')
    image.setAttribute("src",str)
    
    if(randomNumber == 6){
        let deltaX = arrgridChild1[1].left - redChild[0].left;
        let deltaY = arrgridChild1[1].top - redChild[0].top;
        redChildCircle[0].style.position = 'absolute'
        redChildCircle[0].style.left = `${arrgridChild1[1].left}`
        redChildCircle[0].style.left = `${arrgridChild1[1].top}`

        redMove[0] = true
        redChildCircle[0].style.transform = `translate(${deltaX}px, ${deltaY}px)`
    }
    else if(redMove[0] == true){
        if(randomNumber < 4){
            let deltaX = arrgridChild1[1+randomNumber].left - redChild[0].left;
            let deltaY = arrgridChild1[1+randomNumber].top - redChild[0].top;
            redChildCircle[0].style.transform = `translate(${deltaX}px, ${deltaY}px)`
            //redChildCircle[0].style.position = 'absolute'
            //redChildCircle[0].style.left = `${arrgridChild1[1+randomNumber].left}`
            //redChildCircle[0].style.left = `${arrgridChild1[1+randomNumber].top}`
        }
    }
})




redChildCircle[0].style.transform = `translate(${deltaX}px, ${deltaY}px)`;
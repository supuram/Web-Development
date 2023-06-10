const div = document.createElement('div')
div.className = "main"
div.id = 'myId'

div.setAttribute("title", "generated title")
div.style.backgroundColor = "green"  // this green color will not be reflected on the html page
const addText = document.createTextNode("I am learning JavaScript")
div.appendChild(addText)
document.body.appendChild(div)  // now the green color and text of div appears on the screen

const sentence = ['apple', 'orange', 'i love blue', 'sky is beautiful']
for (let i = 0; i < 4; i++) {
    const newDiv = document.createElement('div')
    newDiv.textContent = sentence[i]
    div.appendChild(newDiv)
}
console.log(div.children[2].textContent)
div.children[1].style.backgroundColor = "Violet"
div.children[2].style.padding = "20px"
div.children[2].style.backgroundColor = "orange"
console.log(div)

// ----------------------------------------------------------------------------------------------------------

const div1 = document.createElement('div')
div.className = "main1"
div1.textContent = "I love to travel the world"
div1.style.backgroundColor = "skyblue"
document.body.appendChild(div1) // now div1 is getting seen on the browser screen
const sentence1 = ['Ishita', 'Priyajit', 'Siya', 'Priyanjali']
for (let i = 0; i < 4; i++) {
    const newDiv = document.createElement('div')
    newDiv.textContent = sentence1[i]
    div1.appendChild(newDiv)
}
console.log(div1.children[0].textContent)
console.log(div1)
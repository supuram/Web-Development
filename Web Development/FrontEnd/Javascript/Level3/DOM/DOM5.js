// https://www.youtube.com/watch?v=VQlY-X_eeTE&t=340s

function addLanguage(langName){
    const li = document.createElement('li')
    li.innerHTML = `${langName}`
    document.querySelector('.language').appendChild(li)
}
addLanguage("Python")
addLanguage("Java")

function addOptimizedLanguage(langName){
    const li = document.createElement('li')
    li.appendChild(document.createTextNode(langName))
    document.querySelector('.language').appendChild(li)
}
addOptimizedLanguage("Ruby")

/*
If you use innerHTML the code traverses the entire HTML file. But if you use createTextNode it goes to the target
class or element and so if the HTML file is very large a lot of time is saved
*/

// Edit 
const secondLang = document.querySelector("li:nth-child(2")
const newli = document.createElement('li')
newli.textContent = "Mojo"
secondLang.replaceWith(newli)

const thirdLang = document.querySelector("li:nth-child(3")
thirdLang.remove()
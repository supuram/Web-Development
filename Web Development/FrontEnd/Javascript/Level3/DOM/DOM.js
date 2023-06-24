document.getElementById('title')
document.getElementById('title').id  // title
document.getElementById('title').className   // heading
document.getElementById('title').getAttribute('id')    // title
document.getElementById('title').getAttribute('class')   // heading
document.getElementById('title').setAttribute('class','test')  // heading changes to test in the browser

document.getElementById('title').style.backgroundColor = "green"
document.getElementById('title').style.padding = "20px"
document.getElementById('title').style.borderRadius = "40px"
document.getElementById('title').textContent
document.getElementById('title').innerHTML
document.getElementById('title').innerText

document.querySelector('h1')  // only the first h1 will get displayed
document.querySelector('#title')
document.querySelector('.heading')
document.querySelector('h2')
document.querySelector('input[type = "password"]')
document.querySelector('p:first-child')  // select that p element that is the first-child of its parent
document.querySelector('p')
document.querySelector('ul')
document.querySelector('ul').querySelector('li')
document.querySelector('ul').querySelector('li').innerText   // gives one
document.querySelector('ul').querySelector('li').style.backgroundColor = "deeppink"

document.querySelectorAll('li')   /* Nodelist. So map or filter cannot be applied as they are part of array.
To apply them convert Nodelist to array */
document.querySelectorAll('li')[1].style.color = 'violet'
document.querySelectorAll('li').forEach((l)=>{
    l.style.fontSize = "50px"
})
document.querySelectorAll('.list-item')
document.querySelectorAll('.list-item')[0].innerText

document.getElementsByClassName('heading')   /* HTML Collection. So here you can't apply forEach or other 
properties of array or Nodelist. So you have to convert it to array by - */
Array.from(document.getElementsByClassName('heading'))  // HTML Collection converted to Array
document.getElementsByClassName('list-item')
Array.from(document.getElementsByClassName('list-item')).forEach(l => {
    l.style.color = "green"
})
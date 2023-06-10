const parent = document.querySelector(".parent")
const dayOne = document.querySelector(".day")
console.log(parent)
console.log(parent.children)
console.log(parent.children[0])  // gives <div class="day">Monday</div>
console.log(parent.children[0].textContent)  // gives Monday
parent.children[1].style.color = "green"
console.log(parent.firstElementChild)   // gives <div class="day">Monday</div>
console.log(parent.lastElementChild)  // gives <div class="day">Thursday</div>
console.log(dayOne.parentElement)  // <div class="parent"></div>
console.log(dayOne.nextElementSibling)  // <div class="day" style="color: green;">Tuesday</div>

console.log("NODES =", parent.childNodes)

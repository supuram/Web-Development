/*
The addEventListener method takes two arguments: the type of event to listen for (in this case "click") and 
a function to be called when the event occurs (in this case an anonymous function).

Inside the anonymous function, the this keyword refers to the element that was clicked (i.e., the element 
that triggered the "click" event). So when you call makeSound(this.innerHTML), you’re passing the innerHTML 
property of the clicked element to the makeSound function.

Since the event listener is only added to elements with the class drum, the this keyword inside the 
anonymous function will always refer to an element with that class. So when you access this.innerHTML, 
you’re accessing the innerHTML property of an element with the class drum.
*/

for (let i = 0; i < document.querySelectorAll(".drum").length; i++){
    document.querySelectorAll(".drum")[i].addEventListener("click", function(){
        makeSound(this.innerHTML)
        buttonAnimation(this.innerHTML)
    })
}

/*
The addEventListener method takes two arguments: the type of event to listen for (in this case "keydown")
and a function to be called when the event occurs (in this case an anonymous function).

The anonymous function takes a single argument named event. This argument is an object that contains 
information about the event that occurred. In the case of the "keydown" event, the event object has a 
property named key that contains the value of the key that was pressed.

Inside the anonymous function, the makeSound function is called and passed the value of the key property of
the event object

So when you call makeSound(event.key) inside the callback function, you’re accessing the key property of 
the event object that was passed to the function by the browser. This property contains the value of the 
key that was pressed, so you’re passing that value to the makeSound function.

In summary, the code understands that the event object contains information about a key press because it’s 
listening for the "keydown" event, which is triggered when a key is pressed. And it knows that the event.key
property contains the value of the key that was pressed because that property is automatically added to the
event object by the browser when the "keydown" event is triggered.

In the code you provided earlier, you added a "keydown" event listener to the document object. In this 
example, you’re listening for the "keydown" event on the document object. When a "keydown" event occurs 
(i.e., when the user presses a key on their keyboard), the browser automatically creates a KeyboardEvent 
object that represents the event and passes it as an argument to the callback function.

Inside the callback function, you can access this event object and use its properties and methods to get 
information about the event that occurred. In this case, you’re accessing the key property of the event 
object to get the value of the key that was pressed and passing it to the makeSound function.

In summary, the event object is automatically created and passed to the callback function by the browser 
when an event occurs. It’s not called by any specific object in your code.
*/

document.addEventListener("keydown",function(event){
    makeSound(event.key) //.key tells us which keyboard key was pressed
    buttonAnimation(event.key)
})

function makeSound(key){
    switch(key){
        case 'w':
            let audio1 = new Audio('sounds/crash.mp3')
            audio1.play()
            break;
        case 'a':
            let audio2 = new Audio('sounds/kick-bass.mp3')
            audio2.play()
            break;
        case 's':
            let audio3 = new Audio('sounds/snare.mp3')
            audio3.play()
            break;
        case 'd':
            let audio4 = new Audio('sounds/tom-1.mp3')
            audio4.play()
            break;
        case 'j':
            let audio5 = new Audio('sounds/tom-2.mp3')
            audio5.play()
            break;
        case 'k':
            let audio6 = new Audio('sounds/tom-3.mp3')
            audio6.play()
            break;
        case 'l':
            let audio7 = new Audio('sounds/tom-4.mp3')
            audio7.play()
            break;
    }
}

function buttonAnimation(currentKey){
    document.querySelector("." + currentKey).classList.add("pressed")
    setTimeout(function(){
        document.querySelector("." + currentKey).classList.remove("pressed")
    }, 100)
}
function handleClick(){
    alert("I got clicked")
}
for (let i = 0; i < document.querySelectorAll(".drum").length; i++){
    document.querySelectorAll(".drum")[i].addEventListener("click", handleClick)
}
/*
When you write document.querySelector("button").addEventListener("click", handleClick()) you’re calling the function
immediately and passing its return value (which is undefined since the function doesn’t return anything) as the 
second argument to the addEventListener method. This means that the alert statement inside the handleClick function
is executed immediately when the event listener is added, causing the “I got clicked” message to appear as soon as
you open the webpage.

When you write document.querySelector("button").addEventListener("click", handleClick) you’re passing a reference 
to the handleClick function (without calling it) as the second argument to the addEventListener method. This means 
that the handleClick function is not called immediately when the event listener is added. Instead, it’s called 
later when the button is clicked, causing the “I got clicked” message to appear only when you click the button.

Another way of writing the above code snippet is 
for (let i = 0; i < querySelectorAll(".drum").length; i++){
    document.querySelectorAll("button")[i].addEventListener("click", function(){
        alert("I got clicked")
    });
}
*/
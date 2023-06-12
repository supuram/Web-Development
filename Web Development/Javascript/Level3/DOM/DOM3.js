const story = document.body.querySelector(".story");

const setText = document.body.querySelector("#set-text");
setText.addEventListener("click", () => {
  story.value = "It was a dark and stormy night...";
});

const clearText = document.body.querySelector("#clear-text");
clearText.addEventListener("click", () => {
  story.value = "";
});

/*
The textContent property is used to set or return the text content of the specified node, and all its descendants.
It is commonly used with elements like div, p, span, etc. to get or set their text content.

However, in your code, the element with the class name "story" is a textarea element, not a div element. The 
textarea element is an input element that allows the user to enter multiple lines of text. To get or set the text
content of a textarea element, you need to use its value property instead of its textContent property.

The value property sets or returns the value of the value attribute of a text field, which represents the current
contents of the text field.
*/
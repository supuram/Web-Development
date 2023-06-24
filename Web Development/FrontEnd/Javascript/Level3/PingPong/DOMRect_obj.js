let element = document.querySelectorAll('.ball')
let container = document.querySelector('.container')

let ballBounds0 = element[0].getBoundingClientRect()
let ballBounds1 = element[1].getBoundingClientRect()
let ballBounds2 = element[2].getBoundingClientRect()
let rectBounds = container.getBoundingClientRect()
let ballTop = Math.floor(parseInt(window.getComputedStyle(element[2]).getPropertyValue("top")))
let ballRight = Math.floor(parseInt(window.getComputedStyle(element[2]).getPropertyValue("right")))

console.log(ballBounds0.left, ballBounds0.top, ballBounds0.right, ballBounds0.bottom, ballBounds0.width
    , ballBounds0.height)
console.log(ballBounds1.left, ballBounds1.top, ballBounds1.right, ballBounds1.bottom, ballBounds1.width
        , ballBounds1.height)
console.log(ballBounds2.left, ballBounds2.top, ballBounds2.right, ballBounds2.bottom, ballBounds2.width
            , ballBounds2.height)
console.log(rectBounds.left, rectBounds.top, rectBounds.right, rectBounds.bottom, rectBounds.width
    , rectBounds.height)
console.log(ballTop, ballRight)
console.log(element.length)

/*
ballRight represents the distance between the right edge of an element and the right edge of its containing block, 
while ballBounds2.right represents the x-coordinate of the right edge of an element’s bounding rectangle relative 
to the left edge of the viewport. These two values are not directly comparable and can be different depending on 
how the element is positioned on the page.
*/

/*
The getBoundingClientRect() method returns a DOMRect object that provides information about the size of an 
element and its position relative to the viewport. This method is useful for determining the position and 
dimensions of an element on the page.

The DOMRect object returned by getBoundingClientRect() has several properties that describe the position and 
size of the element’s bounding rectangle in pixels. These properties include left, top, right, bottom, x, y, 
width, and height. The values of these properties are relative to the top-left corner of the viewport, so they 
take into account any scrolling that has been done.
*/

/*
The statement window.getComputedStyle(element[2]).getPropertyValue("top") returns the value of the top property 
of the computed style of the third element in the element collection.

The window.getComputedStyle() method returns a CSSStyleDeclaration object that represents the computed style of 
an element. This object contains information about all of the CSS properties that apply to the element, including 
their values.

The getPropertyValue() method is a method of the CSSStyleDeclaration object that returns the value of a specified
CSS property. In this case, you are calling getPropertyValue("top") to get the value of the top property.

So, this statement gets the computed style of the third element in the element collection, then extracts the 
value of its top property. The value returned by this statement is a string that represents the position of the 
element along the y-axis, relative to its containing block.
*/
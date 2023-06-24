// Done by Bing 

function updateClock() {
    var date = new Date();
    var second = date.getSeconds();
    var minute = date.getMinutes();
    var hour = date.getHours();
    
    var secondAngle = second * 6; // (360 / 60) * second
    var minuteAngle = (minute * 6) + (0.1 * second); // (360 / 60) * minute + (360 / 60 / 60) * second
    var hourAngle = (hour * 30) + (0.5 * minute); // (360 / 12) * hour + (360 / 12 / 60) * minute
    
    document.getElementById("second-hand").style.transform = "rotate(" + secondAngle + "deg)";
    document.getElementById("minute-hand").style.transform = "rotate(" + minuteAngle + "deg)";
    document.getElementById("hour-hand").style.transform = "rotate(" + hourAngle + "deg)";
}

function positionNumbers() {
    var clock = document.getElementById("clock");
    var radius = clock.offsetWidth / 2; /* offsetWidth is a measurement in pixels of the element's CSS width, 
    including any borders, padding, and vertical scrollbars */
    var angle = Math.PI / -3; // Start at the top of the clock
    console.log(angle,radius*2)
    var distanceFactor = 0.85
    for (var i = 1; i <= 12; i++){
        console.log(angle)  // angle in radians
        var numberElement = document.createElement("div");
        numberElement.classList.add("number");  // adding class Name to div element
        numberElement.innerText = i.toString();
        clock.appendChild(numberElement);
        numberElement.style.left = (radius + distanceFactor * radius * Math.cos(angle) - numberElement.offsetWidth / 2) + "px";
        numberElement.style.top = (radius + distanceFactor * radius * Math.sin(angle) - numberElement.offsetHeight / 2) + "px";
        angle += Math.PI / 6; // Move to the next hour
    }
}
console.log(clock)
setInterval(updateClock, 1000)

/*
The horizontal distance from the center of the clock to each number is given by radius * Math.cos(angle), where 
radius is the radius of the clock and angle is the angle of the number relative to the horizontal axis. This 
distance is then multiplied by the distanceFactor to position the numbers closer to or further from the center of
the clock. The numberElement.offsetWidth / 2 term centers the number horizontally within its element.

The angles used in the updateClock function are in degrees. This is because the CSS transform: rotate() function, 
which is used to rotate the clock hands, takes angles in degrees.

On the other hand, the angles used in the positionNumbers function are in radians. This is because the Math.sin() 
and Math.cos() functions, which are used to calculate the positions of the numbers on the clock face, take angles 
in radians.
*/
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
        var numberElement = document.createElement("div");
        numberElement.classList.add("number");
        numberElement.innerText = i.toString();
        clock.appendChild(numberElement);
        numberElement.style.left = (radius + distanceFactor * radius * Math.cos(angle) - numberElement.offsetWidth / 2) + "px";
        numberElement.style.top = (radius + distanceFactor * radius * Math.sin(angle) - numberElement.offsetHeight / 2) + "px";
        angle += Math.PI / 6; // Move to the next hour
    }
}
console.log(clock)
setInterval(updateClock, 1000);
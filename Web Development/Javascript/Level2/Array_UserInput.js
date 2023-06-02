const a = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

let arr = []
for (let i = 0; i < 10; i++){
    a.question('Enter your ${(i+1)}th number =', num => {
        arr.push(Number.parseInt(num))
    });
}
a.close()

/*
This code does not run as intended because
the question method is asynchronous, meaning that it doesn’t block the execution of the rest of the code. This 
means that the for loop will finish executing before all the questions have been asked. You can fix this by using 
recursion or promises to ensure that each question is asked in sequence.

The question method of the readline interface is asynchronous because it waits for user input before executing its 
callback function. This means that the rest of the code can continue to execute while waiting for the user to 
provide input. This is useful because it allows the program to perform other tasks while waiting for input, rather 
than blocking the entire program until the user provides input.

Asynchronous programming is a common pattern in JavaScript and Node.js, and it allows for more efficient and 
responsive programs.

question method of the readline interface always takes a string as its first argument. This string is the prompt 
that is displayed to the user when asking for input.

When the user enters input, it is passed to the callback function as a string, even if the user enters a number. 
If you need to use the input as a number in your code, you can use the parseInt or parseFloat functions to convert
the string to a number.
*/
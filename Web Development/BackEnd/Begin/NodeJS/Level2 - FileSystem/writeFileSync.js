const {writeFileSync} = require('fs')
for(let i = 0; i < 50000; i++){
    writeFileSync('writeFileSync.txt', `hello ${i}\n`, {flag: 'a'} )
}

/*
The {flag: 'a'} option passed to writeFileSync tells it to append the data to the file rather than 
overwriting it.

`writeFileSync` is a method from the `fs` module in Node.js that allows you to write data to a file 
synchronously. It takes three parameters: the file name or descriptor, the data that you want to 
write to the file, and an options object that can be used to specify additional optional parameters.

Like any other synchronous function in Node.js, `writeFileSync` will block the event loop until the 
operation is completed or until it fails. In other words, it blocks the execution of any other 
statements until its execution fails or completes¹. This can be useful for debugging purposes, but 
it's generally considered a bad practice in Node.js because it can reduce performance and cause 
security risks.
*/
console.log('hi')
setTimeout(function(){
    console.log('There was a beautiful woman named Ishita')
},5000) // after waiting for 5s it moves to the callback queue
setTimeout(function(){
    console.log('Javascript is not so easy')
},0)  // // after waiting for 0s it moves to the callback queue
console.log('Ishita')

// This code runs asynchronously
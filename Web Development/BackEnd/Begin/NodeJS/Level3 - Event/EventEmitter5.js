const a = require('./EventEmitter4.js')
const myMessage = new a.myClassLogger()

myMessage.addListener('Message', function(eventArg){ 
    console.log('Listener Called', eventArg)
})

console.log(a)
myMessage.myEvent('Ishita')
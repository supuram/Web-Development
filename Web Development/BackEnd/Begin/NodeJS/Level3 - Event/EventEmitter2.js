const EvEmitter = require('events')
const emitter = new EvEmitter()
/*
The events module exports the EventEmitter class, so when you call new EvEmitter(), you are actually creating a 
new instance of the EventEmitter class. The events module only exports the EventEmitter class as its default export. 
When you use require('events'), you are importing the EventEmitter class directly.
*/

//Register a listener
emitter.addListener('Message', function(eventArg){ /* message is the name of the event, function is the actual 
listener and will be called when the event is raised */
    console.log('Listener Called', eventArg)
})

/* Here a event has been raised. The name of the event is Message. After Message is the data about the event that 
happened,i.e the id and url */
emitter.emit('Message', {id: 1, url: 'https://abc.com'})